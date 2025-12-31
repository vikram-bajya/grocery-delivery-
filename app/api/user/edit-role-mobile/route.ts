import connectDb from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    // const {role,mobile}=req.json()
  } catch (error) {}
}
