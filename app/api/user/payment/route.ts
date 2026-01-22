import connectDb from "@/lib/db";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { userId, totalAmount, items, paymentMethod, address } =
      await req.json();

    if (!userId || !totalAmount || !items || !paymentMethod || !address) {
      return NextResponse.json(
        { massage: "Place send all credential" },
        { status: 400 },
      );
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ massage: "user not found" }, { status: 400 });
    }

    const newOrder = await Order.create({
      user: userId,
      items,
      paymentMethod,
      totalAmount,
      address,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_BASE_URL}/user/order-seccess`,
      cancel_url: `${process.env.NEXT_BASE_URL}/user/order-cancel`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "SnapCart Payment",
            },
            unit_amount: totalAmount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: { orderId: newOrder._id.toString() },
    });
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { massage: `order payment error ${error}` },
      { status: 500 },
    );
  }
}
