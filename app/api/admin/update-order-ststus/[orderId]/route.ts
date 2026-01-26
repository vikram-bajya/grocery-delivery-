import connectDb from "@/lib/db";
import Order from "@/models/order.model";
import { NextResponse } from "next/server";

export async function POST(
  req: NextResponse,
  { params }: { params: { orderId: string } },
) {
    await connectDb()
    const {orderId}=await params;
    const {ststus} =await req.json()
    const order=await Order.findById(orderId).populate("user")
    if(!order){
        return NextResponse.json(
            {massage:"order not found"},
            {status:400}
        )
    }
    order.status=ststus
    let availableDeliverBoy:any=[]

    if(ststus==="out of delivery"&&!order.assignment){
        
    }

}
