"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Apple,
  Baby,
  Box,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Cookie,
  Heart,
  Home,
  Milk,
  Wheat,
} from "lucide-react";
import { motion } from "framer-motion";

function CategorySlider() {
  const categories = [
    { id: 1, name: "Fruits & Vegetables", icon: Apple, color: "bg-green-100" },
    { id: 2, name: "Dairy & Eggs", icon: Milk, color: "bg-yellow-100" },
    { id: 3, name: "Rice & Atta", icon: Wheat, color: "bg-orange-100" },
    { id: 4, name: "Snacks & Biscuits", icon: Cookie, color: "bg-pink-100" },
    { id: 5, name: "Beverages", icon: Coffee, color: "bg-blue-100" },
    { id: 6, name: "Personal Care", icon: Heart, color: "bg-purple-100" },
    { id: 7, name: "Household", icon: Home, color: "bg-lime-100" },
    { id: 8, name: "Instant Foods", icon: Box, color: "bg-teal-100" },
    { id: 9, name: "Baby Care", icon: Baby, color: "bg-rose-100" },
  ];

  const infiniteCategories = [...categories, ...categories];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollContainer = scrollRef.current;
    const scrollAmount = 300;

    const maxScroll = scrollContainer.scrollWidth / 2;

    if (direction === "left") {
      if (scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollLeft = maxScroll;
      }
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      if (scrollContainer.scrollLeft >= maxScroll) {
        scrollContainer.scrollLeft = 0;
      }
      scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;

    const startAutoScroll = () => {
      if (isPaused) return;

      const maxScroll = scrollContainer.scrollWidth / 2;

      if (scrollContainer.scrollLeft >= maxScroll) {
        scrollContainer.scrollLeft -= maxScroll;
      } else {
        scrollContainer.scrollLeft += 1;
      }

      animationFrameId = requestAnimationFrame(startAutoScroll);
    };

    animationFrameId = requestAnimationFrame(startAutoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <motion.div
      className="w-[95%] md:w-[85%] mx-auto mt-10 relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.5 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center">
        🛒 Shop By Category
      </h2>

      <button
        className="absolute -left-4 top-[55%] -translate-y-1/2 z-10
          bg-white shadow-lg border border-gray-100 hover:bg-green-50 rounded-full w-10 h-10
          flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        onClick={() => scroll("left")}
        aria-label="Scroll Left"
      >
        <ChevronLeft className="w-6 h-6 text-green-700" />
      </button>

      <div
        className="flex gap-6 overflow-x-hidden px-4 py-6 scroll-smooth"
        ref={scrollRef}
      >
        {infiniteCategories.map((cat, index) => {
          const IconComponent = cat.icon;
          return (
            <motion.div
              key={`${cat.id}-${index}`}
              className={`min-w-[140px] md:min-w-[160px] flex flex-col items-center 
                justify-center rounded-2xl ${cat.color} shadow-sm hover:shadow-lg
                transform transition-all duration-300 hover:-translate-y-1 cursor-pointer group select-none`}
            >
              <div className="flex flex-col items-center justify-center p-6 w-full">
                <div className="bg-white/40 p-3 rounded-full mb-3 group-hover:bg-white/60 transition-colors">
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-gray-800" />
                </div>
                <p className="text-center text-sm md:text-base font-semibold text-gray-800 line-clamp-2 leading-tight">
                  {cat.name}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button
        className="absolute -right-4 top-[55%] -translate-y-1/2 z-10
          bg-white shadow-lg border border-gray-100 hover:bg-green-50 rounded-full w-10 h-10
          flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        onClick={() => scroll("right")}
        aria-label="Scroll Right"
      >
        <ChevronRight className="w-6 h-6 text-green-700" />
      </button>
    </motion.div>
  );
}

export default CategorySlider;
