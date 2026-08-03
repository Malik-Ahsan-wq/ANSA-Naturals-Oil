import { sendMail } from "@/lib/mailer";
import {
  contactAdminEmail,
  contactCustomerEmail,
  newsletterEmail,
  orderConfirmedEmail,
  orderPlacedEmail,
  type EmailOrderInput,
} from "@/lib/email/templates";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

/**
 * Resolves an absolute base URL for links/images inside emails.
 * Prefers the configured site URL, falling back to the incoming request origin.
 */
export function resolveBaseUrl(requestOrigin?: string | null): string {
  if (SITE_URL) return SITE_URL.replace(/\/$/, "");
  if (requestOrigin) return requestOrigin.replace(/\/$/, "");
  return "https://www.ansanaturals.com";
}

/* ------------------------------ Order placed ----------------------------- */
export async function sendOrderPlacedEmail(
  order: EmailOrderInput,
  baseUrl: string
): Promise<boolean> {
  if (!order.email) return false;
  const mail = orderPlacedEmail(order, baseUrl);
  return sendMail(mail);
}

/* ----------------------------- Order confirmed --------------------------- */
export async function sendOrderConfirmedEmail(
  order: EmailOrderInput,
  baseUrl: string
): Promise<boolean> {
  if (!order.email) return false;
  const mail = orderConfirmedEmail(order, baseUrl);
  return sendMail(mail);
}

/* -------------------------------- Contact -------------------------------- */
export async function sendContactEmails(input: {
  name: string;
  phone: string;
  email: string;
  message: string;
  baseUrl: string;
}): Promise<{ admin: boolean; customer: boolean }> {
  const admin = await sendMail(contactAdminEmail(input));
  let customer = false;
  if (input.email) {
    customer = await sendMail(
      contactCustomerEmail({
        name: input.name,
        email: input.email,
        message: input.message,
        baseUrl: input.baseUrl,
      })
    );
  }
  return { admin, customer };
}

/* ------------------------------- Newsletter ------------------------------ */
export async function sendNewsletterWelcomeEmail(
  email: string,
  baseUrl: string
): Promise<boolean> {
  const mail = newsletterEmail(email, baseUrl);
  return sendMail(mail);
}