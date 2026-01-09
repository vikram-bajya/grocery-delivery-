import React from "react";
import HeroSection from "./heroSection";
import CategorySlider from "./categorySlider";
import connectDb from "@/lib/db";
import Grocery from "@/models/grocery.model";
import GroceryItemCart from "./groceryItemCart";

async function UserDashboard() {
  await connectDb();
  const groceries = await Grocery.find({}).lean();

  return (
    <>
      <HeroSection />
      <CategorySlider />
      {groceries.map((item) => (
        <GroceryItemCart item={item} />
      ))}
    </>
  );
}

export default UserDashboard;
