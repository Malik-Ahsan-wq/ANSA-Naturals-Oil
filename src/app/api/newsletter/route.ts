import { NextRequest, NextResponse } from "next/server";
import { resolveBaseUrl, sendNewsletterWelcomeEmail } from "@/lib/email";
import { addSubscriber } from "@/lib/newsletterStorage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const stored = await addSubscriber(email);

    if (!stored.subscribed) {
      return NextResponse.json(
        { success: false, error: "This email is already subscribed to the circle." },
        { status: 409 }
      );
    }

    const baseUrl = resolveBaseUrl(req.headers.get("origin"));
    const sent = await sendNewsletterWelcomeEmail(email, baseUrl);

    if (!sent) {
      return NextResponse.json(
        { success: false, error: "Subscription saved but the welcome email could not be sent." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}