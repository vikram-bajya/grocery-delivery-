import mongoose from "mongoose";

export interface Iorder {
  _id?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  items: {
    grocery: mongoose.Types.ObjectId;
    quantity: number;
    name: string;
    unit: string;
    price: number;
    image: string;
  }[];
  isPaid: boolean;
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
  assignment?: mongoose.Types.ObjectId;
  assignmentDeliveryBoy?: mongoose.Types.ObjectId;
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
      {
        grocery: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Grocery",
          required: true,
        },
        quantity: { type: Number, required: true },
        name: { type: String, required: true },
        unit: String,
        price: { type: Number, required: true },
        image: String,
      },
    ],
    isPaid: {
      type: Boolean,
      default: false,
    },

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
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliverdAssignment",
      default:null
    },
    assignmentDeliveryBoy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
