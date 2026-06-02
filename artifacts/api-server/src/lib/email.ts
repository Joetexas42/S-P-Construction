import { Resend } from "resend";
import { logger } from "./logger";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_ADDRESS = process.env.ESTIMATOR_FROM_EMAIL ?? "S&P Construction Estimator <onboarding@resend.dev>";

let resendClient: Resend | null = null;
function getResend(): Resend | null {
  if (!RESEND_API_KEY) return null;
  if (!resendClient) resendClient = new Resend(RESEND_API_KEY);
  return resendClient;
}

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export async function sendEmail(params: SendEmailParams): Promise<void> {
  const client = getResend();
  if (!client) {
    logger.warn(
      { to: params.to, subject: params.subject },
      "RESEND_API_KEY not set — skipping email send",
    );
    return;
  }
  try {
    const { error } = await client.emails.send({
      from: FROM_ADDRESS,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
      replyTo: params.replyTo,
    });
    if (error) {
      logger.error({ err: error, to: params.to }, "Failed to send email via Resend");
    } else {
      logger.info({ to: params.to, subject: params.subject }, "Email sent");
    }
  } catch (err) {
    logger.error({ err, to: params.to }, "Unexpected error sending email");
  }
}
