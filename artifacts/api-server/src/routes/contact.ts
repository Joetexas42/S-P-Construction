import { Router } from "express";
import { db } from "@workspace/db";
import { contactSubmissionsTable } from "@workspace/db";
import { z } from "zod";

const router = Router();

const contactInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  company: z.string().nullable().optional(),
  serviceType: z.enum([
    "roof-repair",
    "roof-replacement",
    "inspection",
    "maintenance",
    "storm-damage",
    "emergency-leak",
    "coatings",
    "flat-roofing",
    "metal-roofing",
    "tpo-epdm",
    "other",
  ]),
  propertyType: z.string().nullable().optional(),
  message: z.string().min(1),
  preferredContact: z.enum(["phone", "email"]).nullable().optional(),
  city: z.string().nullable().optional(),
  serviceContext: z.string().nullable().optional(),
});

router.post("/contact", async (req, res) => {
  const parsed = contactInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const data = parsed.data;

  const [submission] = await db
    .insert(contactSubmissionsTable)
    .values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company ?? null,
      serviceType: data.serviceType,
      propertyType: data.propertyType ?? null,
      message: data.message,
      preferredContact: data.preferredContact ?? null,
      city: data.city ?? null,
      serviceContext: data.serviceContext ?? null,
    })
    .returning();

  req.log.info({ id: submission.id }, "Contact submission created");
  res.status(201).json(submission);
});

router.get("/contact/submissions", async (req, res) => {
  const submissions = await db
    .select()
    .from(contactSubmissionsTable)
    .orderBy(contactSubmissionsTable.createdAt);

  res.json(submissions);
});

export default router;
