import { auth } from "@/app/auth";
import connectDb from "@/lib/db";
import Order, { Iorder } from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const session = await auth();
    const orders = await Order.find({ user: session?.user?.id }).populate(
      "user",
    );
  

    if (!orders) {
      return NextResponse.json({ massage: "Order not found" }, { status: 400 });
    }
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { massage: `get all orders error ${error}` },
      { status: 500 },
    );
  }
}
