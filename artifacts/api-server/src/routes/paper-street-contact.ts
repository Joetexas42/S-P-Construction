import { Router } from "express";
import { db } from "@workspace/db";
import { paperStreetContactsTable } from "@workspace/db";
import { z } from "zod";
import { sendEmail } from "../lib/email";

const router = Router();

const NOTIFY_EMAIL = "paperstreetsoftware@gmail.com";

const paperStreetContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

router.post("/paper-street-contact", async (req, res) => {
  const parsed = paperStreetContactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const data = parsed.data;

  const [submission] = await db
    .insert(paperStreetContactsTable)
    .values({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      message: data.message,
    })
    .returning();

  req.log.info({ id: submission.id }, "Paper Street contact submission created");

  const text = [
    `New contact inquiry from the Paper Street Software built-by page`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone ?? "—"}`,
    ``,
    `Message:`,
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; color: #0f172a;">
      <h2 style="margin: 0 0 16px; color: #0f172a;">New Contact Inquiry — Paper Street Software</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 6px 0; color: #475569; width: 80px;">Name</td><td style="padding: 6px 0;"><strong>${escapeHtml(data.name)}</strong></td></tr>
        <tr><td style="padding: 6px 0; color: #475569;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #475569;">Phone</td><td style="padding: 6px 0;">${data.phone ? `<a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>` : "—"}</td></tr>
      </table>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <div style="font-size: 14px;"><strong>Message:</strong><p style="white-space: pre-wrap; color: #334155;">${escapeHtml(data.message)}</p></div>
      <p style="margin-top: 24px; font-size: 12px; color: #64748b;">Submitted via the Paper Street Software built-by page on scottcommercialroofing.com.</p>
    </div>
  `;

  void sendEmail({
    to: NOTIFY_EMAIL,
    subject: `New inquiry: ${data.name}`,
    text,
    html,
    replyTo: data.email,
  });

  res.status(201).json(submission);
});

export default router;
