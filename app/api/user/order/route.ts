import connectDb from "@/lib/db";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

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

    return NextResponse.json(newOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { massage: `place order error: ${error}` },
      { status: 500 },
    );
  }
}
