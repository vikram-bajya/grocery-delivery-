import { auth } from "@/app/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { mobile, role } = await req.json();
    const sessionn = await auth();
    const user = await User.findOneAndUpdate(
      { email: sessionn?.user?.email },
      { mobile, role },
      { new: true }
    );
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    return NextResponse.json({ message: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `edit role and mobile error ${error}` },
      { status: 500 }
    );
  }
}
