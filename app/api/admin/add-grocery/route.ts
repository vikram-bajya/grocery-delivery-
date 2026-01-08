import { auth } from "@/app/auth";
import uploadOnCloundinary from "@/lib/cloudinary";
import connectDb from "@/lib/db";
import Grocery from "@/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const session = await auth();
    if (!session?.user?.role) {
      return NextResponse.json(
        { message: "You Are Not Adimin" },
        { status: 401 }
      );
    }
    const formData = await req.formData();
    const name = formData.get("name");
    const file = formData.get("image") as Blob;
    const price = formData.get("price");
    const category = formData.get("category");
    const unit = formData.get("unit");

    let imageUrl;
    if (file) {
      imageUrl = await uploadOnCloundinary(file);
    }
    const grocery = await Grocery.create({
      name,
      price,
      category,
      unit,
      image: imageUrl,
    });
    return NextResponse.json(grocery, { status: 200 });
  } catch (error) {
    return NextResponse.json(` add grocery error ${error}`, { status: 500 });
  }
}
