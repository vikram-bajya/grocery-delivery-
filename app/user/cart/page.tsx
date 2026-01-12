"use client";
import { RootState } from "@/redux/store";
import { ArrowLeft, ShoppingBasket } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

function CartPage() {
  const { cartData } = useSelector((state: RootState) => state.cart);
  return (
    <div className="w-[95%] sm:w-[80%] mx-auto mt-8 mb-24 relative">
      <Link
        href={"/"}
        className="absolute -top-2 left-0 flex items-center gap-2
      text-green-700 hover:text-green-800 font-medium transition-all"
      >
        <ArrowLeft size={20} />
        <span className="hidden sm:inline">Back to home</span>
      </Link>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 text-center mb-10"
      >
        🛒Your Shopping Cart
      </motion.h2>
      {cartData.length == 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-20 bg-white  rounded-2xl shadow-md"
        >
          <ShoppingBasket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-6">
            Your cart is empity. Add some groceries to continue shoping
          </p>
          <Link
            href={"/"}
            className="bg-green-600 text-white px-6
        py-3 rounded-full hover:bg-green-700 transition-all 
        inline-block font-medium"
          >
            Continue Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-col-1 lg-grid-col-3 gap-8">
          <div>
            <AnimatePresence>
              {cartData.map((item,index) => (
                <motion.div
                key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{opacity:0,y:-20}}
                  className="flex flex-col sm:flex-row items-center bg-white rounded-2xl
                  shadow-md p-5 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                    
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
