import mongoose from "mongoose";
import React from "react";


interface Igrocery {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: number;
  unit: string;
  image?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

function GroceryItemCart({item}:{item:Igrocery}) {
  return <div></div>;
}

export default GroceryItemCart;
