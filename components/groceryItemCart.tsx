"use client";
import {
  decreaseQuantity,
  increaseQuantity,
  setAddToCart,
} from "@/redux/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Minus, Plus, PlusCircle, ShoppingCart } from "lucide-react";
import mongoose from "mongoose";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface Igrocery {
  _id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

function GroceryItemCart({ item }: { item: Igrocery }) {
  const dispatch = useDispatch<AppDispatch>();
  const { cartData } = useSelector((state: RootState) => state.cart);
  const cartItem = cartData.find((i) => i._id == item._id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.5 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300
      overflow-hidden border border-gray-200 flex flex-col"
    >
      <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden group">
        <Image
          src={item.image || "/images/placeholder.png"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          fill
          alt="grocery image"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-black/20
        to-transparent opacity-0 group-hover:opacity-100 transiton-all
        duration-300"
        />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium mb-1 ml-4">
          {item.category}
        </p>
        <h3 className="ml-4">{item.name}</h3>
        <div className="ml-4 flex items-center justify-between mt-2">
          <span
            className=" text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1
        rounded-full"
          >
            {item.unit}
          </span>
          <span className="mr-3 text-green-700 font-bold text-lg">
            ₹{item.price}
          </span>
        </div>
        {!cartItem ? (
          <motion.button
            className="w-[90%] mb-4 mt-4 ml-3 mr-2 flex items-center justify-center gap-2 
        bg-green-600 hover:bg-green-700 text-white rounded-full py-2 text-sm font-medium transition-all"
            whileTap={{ scale: 0.9 }}
            onClick={() => dispatch(setAddToCart({ ...item, quantity: 1 }))}
          >
            <ShoppingCart /> Add to Cart
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex items-center justify-center bg-green-50 border
            border-green-200 rounded-full py-2 px-4 gap-4"
          >
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full
            bg-green-100"
              onClick={() => dispatch(decreaseQuantity(item._id))}
            >
              <Minus size={16} className="text-green" />
            </button>
            <span className="text-sm font-semibold text-gray-800">
              {cartItem.quantity}
            </span>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full
            bg-green-100"
              onClick={() => dispatch(increaseQuantity(item._id))}
            >
              <Plus size={16} className="text-green" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default GroceryItemCart;
