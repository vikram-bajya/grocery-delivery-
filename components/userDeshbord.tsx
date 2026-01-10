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

      <div className="w-[90%] md:w-[80%] mx-auto mt-10">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center">
          Popular Grocery Items
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {groceries.map((item: any, index) => (
            <GroceryItemCart key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
