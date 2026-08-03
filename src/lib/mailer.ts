import nodemailer, { Transporter } from "nodemailer";
import { brand } from "@/data/brand";

export type MailOptions = {
  to: string | string[];
  from?: string;
  subject: string;
  html: string;
  text?: string;
};

const {
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SECURE,
} = process.env;

const isValidConfig =
  typeof EMAIL_USER === "string" && EMAIL_USER.length > 0 &&
  typeof EMAIL_PASSWORD === "string" && EMAIL_PASSWORD.length > 0;

function createTransporter(): Transporter {
  const secure =
    EMAIL_SECURE === "false" ? false : String(EMAIL_PORT || "465") === "465";
  return nodemailer.createTransport({
    host: EMAIL_HOST || "smtp.gmail.com",
    port: Number(EMAIL_PORT || 465),
    secure,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });
}

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!isValidConfig) {
    console.warn(
      "[mailer] EMAIL_USER / EMAIL_PASSWORD are not configured. Email sending is disabled."
    );
    return null;
  }
  if (!transporter) {
    transporter = createTransporter();
  }
  return transporter;
}

/**
 * Sends an email with a small retry mechanism for transient failures.
 * Resolves `true` on success and `false` when emailing is disabled or fails
 * after all attempts (the error is logged, never thrown to callers).
 */
export async function sendMail(options: MailOptions): Promise<boolean> {
  const transport = getTransporter();
  if (!transport) return false;

  const to = Array.isArray(options.to) ? options.to.join(",") : options.to;
  const mail = {
    from: options.from || `"${brand.name}" <${EMAIL_USER}>`,
    to,
    subject: options.subject,
    html: options.html,
    text: options.text || stripHtml(options.html),
  };

  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await transport.sendMail(mail);
      return true;
    } catch (error) {
      const last = attempt === maxAttempts;
      console.error(
        `[mailer] sendMail attempt ${attempt}/${maxAttempts} failed for "${to}":`,
        error
      );
      if (!last) {
        await delay(500 * attempt);
      }
    }
  }
  return false;
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}