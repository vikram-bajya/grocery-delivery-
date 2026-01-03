"use client";
import { icons, Leaf, ShoppingBasket, Smartphone, Truck } from "lucide-react";

import { AnimatePresence } from "motion/react";
import React, { useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
function HeroSection() {
  const slide = [
    {
      id: 1,
      icon: (
        <Leaf className="w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg" />
      ),
      title: "Farm-Fresh Groceries 🌳",
      subtitle:
        "Fram-Fresh furits, vegetables, and daily essentials delivered to you",
      btnText: "Shop Now",
      bg: "https://plus.unsplash.com/premium_photo-1742244063295-df7a2520261c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D   ",
    },
    {
      id: 2,
      icon: (
        <Truck className="w-20 h-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg" />
      ),
      title: "Fast & Reliable Delivery 🚚",
      subtitle:
        "We ensure your groceries arrive quickly and safely at your doorstep",

      btnText: "Order Now",
      bg: "https://plus.unsplash.com/premium_photo-1757583509826-aaaf47ba1efa?q=80&w=1355&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      icon: (
        <Smartphone className="w-20 h-20 sm:w-28 sm:h-28 text-blue-400 drop-shadow-lg" />
      ),
      title: "Shop Anytime, Anywhere 🌎",
      subtitle: "Easy and seamless online grocery shopping experience",

      btnText: "Get Start",
      bg: " https://plus.unsplash.com/premium_photo-1661964321886-e1195f8026af?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  const [current, setCurrent] = React.useState(0);
  useEffect(() => {
    const time = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slide.length);
    }, 4000);
    return () => clearInterval(time);
  }, [slide.length]);

  return (
    <div className="relative w-[98%] rounded-2xl mx-auto mt-26 h-96 sm:h-[80vh] overflow-hidden shdow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
        >
          <Image
            src={slide[current].bg}
            fill
            alt={slide[current].title}
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 max-w-3xl"
        >
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-full shadow-lg">
            {slide[current].icon}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold drop-shadow-lg">
            {slide[current].title}
          </h1>
          <p className="text-lg sm:text-xl drop-shadow-lg">
            {slide[current].subtitle}
          </p>
          <motion.button
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="mt-4 px-8 py-3 bg-white text-green-700 hover:bg-green-100  rounded-full shadow-lg text-lg font-semibold drop-shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingBasket className="w-5 h-5" />
            {slide[current].btnText}
          </motion.button>
        </motion.div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slide.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-white " : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
