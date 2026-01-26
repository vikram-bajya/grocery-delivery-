import mongoose, { Schema } from "mongoose";

interface IDeliveryAssignment {
  _id?: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  brodcastedTo: mongoose.Types.ObjectId[];
  assignedTo: mongoose.Types.ObjectId | null;
  ststus: "bordcast" | "assigned" | "completed";
  acceptedAt: Date;
  createdAt: Date;
  updateAt: Date;
}

const deliverdAssignmentSchema = new mongoose.Schema<IDeliveryAssignment>(
  {
    order: {
      type: mongoose.Types.ObjectId,
      ref: "order",
    },
    brodcastedTo: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    ststus: {
      type: String,
      enum: ["bordcast", "assigned", "completed"],
      default: "bordcast",
    },
    acceptedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const DeliverdAssignment =
  mongoose.models.DeliverdAssignment ||
  mongoose.model("DeliverdAssignment", deliverdAssignmentSchema);

  export default DeliverdAssignment