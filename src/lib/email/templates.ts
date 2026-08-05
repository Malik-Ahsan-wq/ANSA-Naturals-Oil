import { brand } from "@/data/brand";
import { MailOptions } from "@/lib/mailer";

/* ----------------------------- Brand palette ----------------------------- */
const GREEN_DARK = "#1a1a1a";
const GREEN = "#000000";
const GREEN_LIGHT = "#333333";
const GOLD = "#e6c277";
const CREAM = "#fbf8f1";
const INK = "#14241b";

function money(value: number): string {
  return `${brand.currency} ${value.toLocaleString()}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function orderNumberLabel(id: string): string {
  const digits = id.replace(/[^0-9a-z]/gi, "").slice(-6).toUpperCase();
  return `#${digits}`;
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ------------------------------ Shared types ----------------------------- */
export type EmailOrderItem = {
  productName: string;
  quantity: number;
  price: number;
};

export type EmailOrderInput = {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  totalAmount: number;
  paymentMethod: string;
  note?: string;
  items: EmailOrderItem[];
  createdAt: string;
};

/* ---------------------------- Shared layout ----------------------------- */
function baseLayout(opts: {
  preheader: string;
  heading: string;
  eyebrow: string;
  body: string;
  baseUrl: string;
}): string {
  const { preheader, heading, eyebrow, body, baseUrl } = opts;
  const logoUrl = `${baseUrl}${brand.logo}`;
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${brand.name}</title>
  <style>
    a { color: ${GREEN}; }
    body { margin: 0; padding: 0; background-color: #ecebe4; }
    table { border-collapse: collapse; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#ecebe4; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:${INK};">

  <div style="display:none; max-height:0; overflow:hidden;">
    ${preheader}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ecebe4; padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 10px 30px rgba(20,36,27,0.08);">

          <tr>
            <td style="background:linear-gradient(135deg, ${GREEN_DARK}, ${GREEN}); padding:28px 32px; text-align:center;">
              <img src="${logoUrl}" alt="${brand.name}" width="168" style="width:168px; max-width:100%;" />
              <div style="color:${GOLD}; font-size:11px; letter-spacing:3px; text-transform:uppercase; margin-top:10px; font-weight:600;">
                ${brand.tagline}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 32px 8px 32px; text-align:center;">
              <h1 style="margin:0 0 6px 0; font-size:26px; line-height:1.3; color:${GREEN_DARK}; font-weight:800;">
                ${heading}
              </h1>
              <p style="margin:0; color:${GREEN}; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; font-weight:700;">
                ${eyebrow}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px 28px 32px; font-size:15px; line-height:1.6; color:#3c443e;">
              ${body}
            </td>
          </tr>

          <tr>
            <td style="background-color:${CREAM}; padding:24px 32px; border-top:1px solid #e7e6df; text-align:center;">
              <p style="margin:0 0 12px 0; color:${GREEN_DARK}; font-size:13px; font-weight:700;">
                ${brand.name} &middot; Premium Natural Hair Oil
              </p>
              <p style="margin:0 0 16px 0; color:#6b726d; font-size:12px; line-height:1.7;">
                ${brand.address}<br />
                <a href="mailto:${brand.email}" style="color:${GREEN}; text-decoration:none;">${brand.email}</a>
                &nbsp;&middot;&nbsp; ${brand.phone}
              </p>
              <p style="margin:0; color:#9aa29c; font-size:11px;">
                You are receiving this email because of your recent activity with ${brand.name}.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ------------------------------ Order placed ----------------------------- */
export function orderPlacedEmail(order: EmailOrderInput, baseUrl: string): MailOptions {
  const orderNumber = orderNumberLabel(order._id);
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 0; border-bottom:1px solid #eeece5; font-size:14px; color:${INK};">
          ${escapeHtml(item.productName)}
          <span style="color:#8a918b; font-size:12px;"> × ${item.quantity}</span>
        </td>
        <td style="padding:12px 0; border-bottom:1px solid #eeece5; font-size:14px; font-weight:700; color:${GREEN}; text-align:right; white-space:nowrap;">
          ${money(item.price * item.quantity)}
        </td>
      </tr>`
    )
    .join("");

  const html = baseLayout({
    preheader: `We've received your order ${orderNumber}. Your pure cold-pressed hair oil is on the way!`,
    heading: `Thank you, ${escapeHtml(order.customerName)}!`,
    eyebrow: `Order ${orderNumber} · ${fmtDate(order.createdAt)}`,
    baseUrl,
    body: `
      <p style="margin:0 0 16px 0;">
        We've received your order. Our team is preparing your bottle of pure, cold-pressed
        natural hair oil and it will ship from our studio within 24 hours.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${CREAM}; border-radius:14px; padding:8px 0; margin-top:8px;">
        ${itemsHtml}
        <tr>
          <td style="padding:14px 0 4px 0; font-size:14px; color:#3c443e;">Total</td>
          <td style="padding:14px 0 4px 0; font-size:16px; font-weight:800; color:${GREEN}; text-align:right; white-space:nowrap;">${money(order.totalAmount)}</td>
        </tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px; font-size:13px; line-height:1.7; color:#3c443e;">
        <tr><td style="font-weight:700; color:${INK}; width:90px;">Deliver to</td><td>${escapeHtml(order.address)}</td></tr>
        <tr><td style="font-weight:700; color:${INK};">Phone</td><td>${escapeHtml(order.phone)}</td></tr>
        <tr><td style="font-weight:700; color:${INK};">Payment</td><td>${escapeHtml(order.paymentMethod)}</td></tr>
        ${
          order.note
            ? `<tr><td style="font-weight:700; color:${INK};">Note</td><td>${escapeHtml(order.note)}</td></tr>`
            : ""
        }
      </table>
      <p style="margin:24px 0 0 0;">
        We'll send a confirmation the moment your order ships. For any questions, reply to
        this email or reach us on WhatsApp.
      </p>
    `,
  });

  return {
    to: order.email,
    subject: `${brand.name} — Order ${orderNumber} Received`,
    html,
  };
}

/* ----------------------------- Order confirmed --------------------------- */
export function orderConfirmedEmail(order: EmailOrderInput, baseUrl: string): MailOptions {
  const orderNumber = orderNumberLabel(order._id);
  const rows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0; border-bottom:1px solid #eeece5; font-size:14px; color:${INK};">
          ${escapeHtml(item.productName)}
          <span style="color:#8a918b; font-size:12px;"> × ${item.quantity}</span>
        </td>
        <td style="padding:10px 0; border-bottom:1px solid #eeece5; font-size:14px; font-weight:700; color:${GREEN}; text-align:right; white-space:nowrap;">${money(item.price * item.quantity)}</td>
      </tr>`
    )
    .join("");

  const html = baseLayout({
    preheader: `Your ANSA order ${orderNumber} is confirmed.`,
    heading: `Order Confirmed, ${escapeHtml(order.customerName)}!`,
    eyebrow: `Order ${orderNumber}`,
    baseUrl,
    body: `
      <p style="margin:0 0 16px 0;">
        Good news — your order has been confirmed and is being carefully packed for
        nationwide delivery. You'll receive tracking details as soon as it leaves our studio.
      </p>
      <p style="margin:0 0 4px 0; font-weight:700; color:${INK};">Order summary</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${CREAM}; border-radius:14px; padding:12px 0 8px 0;">
        ${rows}
        <tr>
          <td style="padding:12px 0 2px 0; font-size:15px; color:#2c4132;">Total</td>
          <td style="padding:12px 0 2px 0; font-size:15px; font-weight:800; color:${GREEN}; text-align:right; white-space:nowrap;">${money(order.totalAmount)}</td>
        </tr>
      </table>
      <p style="margin:20px 0 0 0; color:#3c443e;">
        Questions about your order? Reply to this email or message us on WhatsApp — we're here to help.
      </p>
    `,
  });

  return {
    to: order.email,
    subject: `${brand.name} — Order ${orderNumber} Confirmed`,
    html,
  };
}

/* -------------------------------- Contact -------------------------------- */
export function contactAdminEmail(input: {
  name: string;
  phone: string;
  email: string;
  message: string;
  baseUrl: string;
}): MailOptions {
  const { name, phone, email, message, baseUrl } = input;
  const html = baseLayout({
    preheader: `New enquiry from ${name}`,
    heading: "New Contact Enquiry",
    eyebrow: brand.name,
    baseUrl,
    body: `
      <p style="margin:0 0 16px 0;">A customer has sent an enquiry through the website contact form.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; line-height:1.7; background-color:${CREAM}; border-radius:12px; padding:16px 20px;">
        <tr><td style="font-weight:700; color:${INK}; width:110px;">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="font-weight:700; color:${INK};">Phone</td><td>${escapeHtml(phone)}</td></tr>
        <tr><td style="font-weight:700; color:${INK};">Email</td><td>${escapeHtml(email)}</td></tr>
      </table>
      <p style="margin:20px 0 4px 0; font-weight:700; color:${INK};">Message</p>
      <p style="margin:0; color:#3c443e;">${escapeHtml(message)}</p>
    `,
  });

  return {
    to: brand.email,
    subject: `New enquiry — ${name} (${phone})`,
    html,
  };
}

export function contactCustomerEmail(input: {
  name: string;
  email: string;
  message: string;
  baseUrl: string;
}): MailOptions {
  const { name, email, message, baseUrl } = input;
  const html = baseLayout({
    preheader: `We've received your message, ${name}.`,
    heading: `Thanks, ${escapeHtml(name)}!`,
    eyebrow: "Message Received",
    baseUrl,
    body: `
      <p style="margin:0 0 16px 0;">
        We've received your message and our wellness team will get back to you within a few
        hours, seven days a week.
      </p>
      <blockquote style="margin:20px 0 0 0; padding:14px 18px; background-color:${CREAM}; border-left:4px solid ${GREEN}; border-radius:0 10px 10px 0; font-size:14px; color:#2a2f2b;">
        "${escapeHtml(message)}"
      </blockquote>
      <p style="margin:16px 0 0 0; color:#3c443e;">
        For anything urgent, reach us on WhatsApp at ${brand.phone}.
      </p>
    `,
  });

  return {
    to: email,
    subject: `${brand.name} — We've received your message`,
    html,
  };
}

/* ------------------------------- Newsletter ------------------------------ */
export function newsletterEmail(to: string, baseUrl: string): MailOptions {
  const html = baseLayout({
    preheader: "Welcome to the ANSA Naturals hair-care circle.",
    heading: "Welcome to the Circle",
    eyebrow: "You're subscribed",
    baseUrl,
    body: `
      <p style="margin:0 0 16px 0;">
        Thank you for joining the ANSA Naturals hair-care circle. You'll be the first to hear
        about new arrivals, seasonal hair oil blends and exclusive offers for nourished, thriving hair.
      </p>
      <p style="margin:0; color:#3c443e;">
        Meanwhile, explore our signature cold-pressed hair oil rituals to give your strands the love they deserve.
      </p>
      <div style="margin-top:20px; text-align:center;">
        <a href="${baseUrl}/products" style="display:inline-block; background:${GREEN}; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:999px; font-size:14px; font-weight:700;">
          Discover the Oil
        </a>
      </div>
    `,
  });

  return {
    to,
    subject: `${brand.name} — Welcome to the Circle`,
    html,
  };
}

export { GREEN_LIGHT, GREEN_DARK, GOLD };
