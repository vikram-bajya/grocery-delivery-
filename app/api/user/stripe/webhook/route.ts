import connectDb from "@/lib/db";
import Order from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  // 1. CONNECT DB (Crucial step often missed)
  await connectDb();

  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;

  try {
    // 2. Verify Signature
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
    console.log("✅ Webhook Verified. Event Type:", event.type);
  } catch (error) {
    console.error("❌ Signature verification failed:", error);
    return NextResponse.json({ message: "Webhook Error" }, { status: 400 });
  }

  // 3. Handle the Event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    console.log("📦 Payment Session Data:", {
      id: session.id,
      orderId: orderId, // If this prints 'undefined', we know the issue!
      amount_total: session.amount_total,
    });

    if (orderId) {
      try {
        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { isPaid: true },
          { new: true },
        );

        if (updatedOrder) {
          console.log("🎉 Order Updated Successfully:", updatedOrder._id);
        } else {
          console.log("⚠️ Order ID not found in Database:", orderId);
        }
      } catch (err) {
        console.error("❌ Database Update Error:", err);
      }
    } else {
      console.log("⚠️ No Order ID found in session metadata");
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
