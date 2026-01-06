import mongoose from "mongoose";

interface Igrocery {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: number;
  unit: number;
  image?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const grocerySchema = new mongoose.Schema<Igrocery>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Fruits & Vegetables",
        "Dairy & Eggs",
        "Rice & atta & Grains",
        "Snacks & Biscuits",
        "Beverages & drinks",
        "Personal Care",
        "Household Essentials",
        "Instant & pakeged Foods",
        "Baby & pet  Care",
      ],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: Number,
      required: true,
      ennum: ["kg","g", "litre","ml", "piece", "pack"],
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create a model using the schema
const Grocery =
  mongoose.models.Grocery || mongoose.model("Grocery", grocerySchema);
export default Grocery;
