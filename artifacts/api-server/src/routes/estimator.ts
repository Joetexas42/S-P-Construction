import { Router } from "express";
import { db, estimatorSubmissionsTable } from "@workspace/db";
import { z } from "zod";
import {
  ESTIMATOR_SERVICE_IDS,
  computeEstimateUsd,
  getEstimatorServiceById,
} from "@workspace/estimator-config";
import { sendEmail } from "../lib/email";
import { logger } from "../lib/logger";

const router = Router();

const NOTIFY_EMAIL = "TODDWDALLAS@GMAIL.COM";

const estimatorInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  company: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  address: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  roofSqft: z.number().int().min(1),
  sqftSource: z.enum(["solar", "manual"]),
  serviceType: z.string().refine((s) => ESTIMATOR_SERVICE_IDS.includes(s), {
    message: "Unknown service type",
  }),
});

router.post("/estimator", async (req, res) => {
  const parsed = estimatorInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }
  const data = parsed.data;

  // Always recompute price server-side from the shared pricing config.
  // Client-supplied dollar values are ignored — pricing is the server's
  // responsibility so the stored/email values can't be tampered with and
  // always reflect the current config.
  const service = getEstimatorServiceById(data.serviceType);
  if (!service) {
    res.status(400).json({ error: "Unknown service type" });
    return;
  }
  const pricePerSqft = service.pricePerSqft;
  const estimatedCostUsd = computeEstimateUsd(data.roofSqft, pricePerSqft);

  const [submission] = await db
    .insert(estimatorSubmissionsTable)
    .values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company ?? null,
      message: data.message ?? null,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      roofSqft: data.roofSqft,
      sqftSource: data.sqftSource,
      serviceType: data.serviceType,
      estimatedCostUsd,
      pricePerSqft,
    })
    .returning();

  req.log.info({ id: submission.id }, "Estimator submission created");

  const serviceLabel = service.label;
  const formattedCost = estimatedCostUsd.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const formattedSqft = data.roofSqft.toLocaleString("en-US");

  // Public, key-free satellite view link. The server API key is NEVER
  // included in outbound email content. The recipient just clicks through
  // to Google Maps in satellite mode.
  const satelliteViewUrl = `https://www.google.com/maps/@${data.latitude},${data.longitude},20z/data=!3m1!1e3`;

  const text = [
    `New instant roof estimate request`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Company: ${data.company ?? "—"}`,
    ``,
    `Address: ${data.address}`,
    `Coordinates: ${data.latitude}, ${data.longitude}`,
    `Roof area: ${formattedSqft} sq ft (${data.sqftSource === "solar" ? "Google Solar API" : "manual outline"})`,
    `Service: ${serviceLabel}`,
    `Per-sqft price used: $${pricePerSqft.toFixed(2)}`,
    `Ballpark estimate: ${formattedCost}`,
    ``,
    `Message:`,
    data.message ?? "(none)",
    ``,
    `Satellite view: ${satelliteViewUrl}`,
  ].join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; color: #0f172a;">
      <h2 style="margin: 0 0 16px; color: #0f172a;">New Instant Roof Estimate Request</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 6px 0; color: #475569;">Name</td><td style="padding: 6px 0;"><strong>${escapeHtml(data.name)}</strong></td></tr>
        <tr><td style="padding: 6px 0; color: #475569;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #475569;">Phone</td><td style="padding: 6px 0;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #475569;">Company</td><td style="padding: 6px 0;">${escapeHtml(data.company ?? "—")}</td></tr>
      </table>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 6px 0; color: #475569;">Address</td><td style="padding: 6px 0;"><strong>${escapeHtml(data.address)}</strong></td></tr>
        <tr><td style="padding: 6px 0; color: #475569;">Coordinates</td><td style="padding: 6px 0;">${data.latitude.toFixed(6)}, ${data.longitude.toFixed(6)}</td></tr>
        <tr><td style="padding: 6px 0; color: #475569;">Roof area</td><td style="padding: 6px 0;"><strong>${formattedSqft} sq ft</strong> <span style="color:#64748b;">(${data.sqftSource === "solar" ? "Google Solar API" : "manual outline"})</span></td></tr>
        <tr><td style="padding: 6px 0; color: #475569;">Service</td><td style="padding: 6px 0;">${escapeHtml(serviceLabel)}</td></tr>
        <tr><td style="padding: 6px 0; color: #475569;">Per-sqft price</td><td style="padding: 6px 0;">$${pricePerSqft.toFixed(2)}</td></tr>
        <tr><td style="padding: 6px 0; color: #475569;">Ballpark estimate</td><td style="padding: 6px 0; font-size: 18px;"><strong>${formattedCost}</strong></td></tr>
      </table>
      ${data.message ? `<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" /><div style="font-size: 14px;"><strong>Message:</strong><p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p></div>` : ""}
      <p style="margin-top: 20px; font-size: 14px;"><a href="${satelliteViewUrl}">Open satellite view in Google Maps →</a></p>
      <p style="margin-top: 24px; font-size: 12px; color: #64748b;">This is an automated lead notification from the Lone Star Commercial Roofing instant estimator. The dollar figure shown is a ballpark generated from per-sqft pricing — not a binding quote.</p>
    </div>
  `;

  void sendEmail({
    to: NOTIFY_EMAIL,
    subject: `New estimate request: ${data.name} — ${serviceLabel} (${formattedCost})`,
    text,
    html,
    replyTo: data.email,
  });

  res.status(201).json(submission);
});

router.get("/estimator/submissions", async (_req, res) => {
  const submissions = await db
    .select()
    .from(estimatorSubmissionsTable)
    .orderBy(estimatorSubmissionsTable.createdAt);
  res.json(submissions);
});

const roofAreaQuerySchema = z.object({
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

const EMPTY_ROOF = {
  found: false as const,
  roofAreaSqMeters: null,
  roofAreaSqft: null,
  roofSegments: [] as Array<{ swLat: number; swLng: number; neLat: number; neLng: number }>,
};

router.get("/estimator/roof-area", async (req, res) => {
  const parsed = roofAreaQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid lat/lng" });
    return;
  }
  const { lat, lng } = parsed.data;
  const key = process.env.GOOGLE_MAPS_SERVER_API_KEY;
  if (!key) {
    req.log.warn("GOOGLE_MAPS_SERVER_API_KEY not set — returning no-data");
    res.json(EMPTY_ROOF);
    return;
  }

  const url =
    `https://solar.googleapis.com/v1/buildingInsights:findClosest` +
    `?location.latitude=${lat}&location.longitude=${lng}` +
    `&requiredQuality=LOW&key=${key}`;

  try {
    const resp = await fetch(url);
    if (resp.status === 404) {
      res.json(EMPTY_ROOF);
      return;
    }
    if (!resp.ok) {
      req.log.warn({ status: resp.status }, "Solar API non-OK response");
      res.json(EMPTY_ROOF);
      return;
    }
    const json = (await resp.json()) as {
      solarPotential?: {
        wholeRoofStats?: { areaMeters2?: number };
        roofSegmentStats?: Array<{
          stats?: { areaMeters2?: number };
          boundingBox?: {
            sw?: { latitude?: number; longitude?: number };
            ne?: { latitude?: number; longitude?: number };
          };
        }>;
      };
    };
    const areaMeters2 = json.solarPotential?.wholeRoofStats?.areaMeters2;
    if (typeof areaMeters2 !== "number" || areaMeters2 <= 0) {
      res.json(EMPTY_ROOF);
      return;
    }

    const roofSegments: Array<{
      swLat: number;
      swLng: number;
      neLat: number;
      neLng: number;
    }> = [];
    for (const seg of json.solarPotential?.roofSegmentStats ?? []) {
      const swLat = seg.boundingBox?.sw?.latitude;
      const swLng = seg.boundingBox?.sw?.longitude;
      const neLat = seg.boundingBox?.ne?.latitude;
      const neLng = seg.boundingBox?.ne?.longitude;
      if (
        typeof swLat === "number" &&
        typeof swLng === "number" &&
        typeof neLat === "number" &&
        typeof neLng === "number"
      ) {
        roofSegments.push({ swLat, swLng, neLat, neLng });
      }
    }

    const sqft = areaMeters2 * 10.7639;
    res.json({
      found: true,
      roofAreaSqMeters: areaMeters2,
      roofAreaSqft: Math.round(sqft),
      roofSegments,
    });
  } catch (err) {
    logger.error({ err }, "Solar API request failed");
    res.json(EMPTY_ROOF);
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default router;
