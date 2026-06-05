import { Router } from "express";
import { z } from "zod";
import { sendEmail } from "../lib/email";

const router = Router();

const builtByContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(1, "Message is required"),
});

const PAPER_STREET_EMAIL =
  process.env.PAPER_STREET_CONTACT_EMAIL ?? "paperstreetsoftware@gmail.com";

router.post("/built-by-contact", async (req, res): Promise<void> => {
  const parsed = builtByContactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.flatten().fieldErrors });
    return;
  }

  const { name, email, message } = parsed.data;

  req.log.info({ name, email }, "Paper Street contact form submission received");

  await sendEmail({
    to: PAPER_STREET_EMAIL,
    subject: `New inquiry from ${name} via paperstreet.online`,
    replyTo: email,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#1a1a1a">New Contact Inquiry — Paper Street Software Co.</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;width:100px">Name</td>
            <td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">Email</td>
            <td style="padding:8px 0;border-bottom:1px solid #eee">
              <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
            </td>
          </tr>
        </table>
        <h3 style="color:#1a1a1a;margin-bottom:8px">Message</h3>
        <p style="background:#f5f5f5;padding:16px;border-radius:6px;white-space:pre-wrap">${escapeHtml(message)}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
        <p style="color:#999;font-size:12px">Sent via the Paper Street Software Co. contact form on scottcommercialroofing.com</p>
      </div>
    `,
    text: `New Contact Inquiry — Paper Street Software Co.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via the Paper Street Software Co. contact form on scottcommercialroofing.com`,
  });

  res.status(200).json({ ok: true });
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
