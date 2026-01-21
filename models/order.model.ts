import mongoose from "mongoose";

interface Iorder {
  _id?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  items: [
    {
      grocery: mongoose.Types.ObjectId;
      quantity: number,
        name: string,
        unit: string,

        price: number,
        image: string,
    },
  ];
  totalAmount: number;
  paymentMethod: "cod" | "online";
  address: {
    fullName: string;
    mobile: string;
    city: string;
    state: string;
    pincode: string;
    fullAddress: string;
    latitude: string;
   longitude: string;
  };
  status: "pending" | "out of deliver" | "delivered";
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new mongoose.Schema<Iorder>(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      { type: mongoose.Schema.ObjectId, ref: "Grocery", required: true },
      {
        quantity: Number,
        name: String,
        unit: String,

        price: Number,
        image: String,
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "cod",
    },
    totalAmount: Number,
    address: {
      fullName: String,
      mobile: String,
      city: String,
      state: String,
      pincode: String,
      fullAddress: String,
      latitude: String,
      longitude: String,
    },
    status: {
      type: String,
      enum: ["pending", "out of deliver", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
