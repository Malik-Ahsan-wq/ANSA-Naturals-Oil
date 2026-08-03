import { NextRequest, NextResponse } from "next/server";
import { getOrders, saveOrder, deleteOrder, updateOrderStatus } from "@/lib/orderStorage";
import { resolveBaseUrl, sendOrderConfirmedEmail, sendOrderPlacedEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const customerName = typeof body.customerName === "string" ? body.customerName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const address = typeof body.address === "string" ? body.address.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const note = typeof body.note === "string" ? body.note.trim() : "";

    if (!customerName || !address || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, address and phone are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required for order confirmation." },
        { status: 400 }
      );
    }

    const order = await saveOrder({
      customerName,
      email,
      address,
      phone,
      note,
      totalAmount: Number(body.totalAmount) || 0,
      paymentMethod: body.paymentMethod || "Cash on Delivery",
      items: Array.isArray(body.items) ? body.items : [],
    });

    const baseUrl = resolveBaseUrl(req.headers.get("origin"));
    const emailed = await sendOrderPlacedEmail(order, baseUrl);

    return NextResponse.json(
      { success: true, order, emailSent: emailed },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    const deleted = await deleteOrder(id);
    if (!deleted) return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order delete error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete order" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing id or status" }, { status: 400 });
    }

    const existing = (await getOrders()).find((o) => o._id === id);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    const order = await updateOrderStatus(id, status);

    const baseUrl = resolveBaseUrl(req.headers.get("origin"));
    const isConfirmation = status === "Confirmed" && existing.status !== "Confirmed";
    const emailed = isConfirmation ? await sendOrderConfirmedEmail(order!, baseUrl) : false;

    return NextResponse.json({ success: true, order, emailSent: emailed });
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : "Failed to update order";
    if (msg.includes("Invalid order status")) {
      return NextResponse.json({ success: false, error: msg }, { status: 400 });
    }
    console.error("Order update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 });
  }
}