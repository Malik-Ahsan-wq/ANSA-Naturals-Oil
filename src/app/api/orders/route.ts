import { NextRequest, NextResponse } from "next/server";
import { getOrders, saveOrder, deleteOrder } from "@/lib/orderStorage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const order = await saveOrder(body);
    return NextResponse.json({ success: true, order }, { status: 201 });
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
