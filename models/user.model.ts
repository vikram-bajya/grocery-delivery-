import mongoose from "mongoose";

interface Iuser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
  loaction?: {
    type: {
      type: StringConstructor;
      enum: string[];
      default: string;
    };
    coordinates: {
      type: number[];
      default: number[];
    };
  };
}

const userSchema = new mongoose.Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,

      required: false,
    },
    mobile: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "deliverBoy", "admin"],
      default: "user",
    },
    image: {
      type: String,
    },
    //gioJson formate me h
    loaction: {
      type: {
        type: String,
        enum: ["point"],
        default: "point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
        //first longitude fir  latitude
      },
    },
  },
  { timestamps: true },
);

userSchema.index({ loaction: "2dsphere" });
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
