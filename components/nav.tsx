"use client";
import {
  Cross,
  LogOut,
  Package,
  Search,
  ShoppingCartIcon,
  User,
  X,
} from "lucide-react";
import mongoose from "mongoose";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion as Motion } from "motion/react";
import { signOut } from "next-auth/react";
import { u } from "motion/react-client";

interface Iuser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
}

function Nav({ user }: { user: Iuser }) {
  const [open, setOpen] = useState(false);
  const profileDropdown = useRef<HTMLDivElement>(null);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdown &&
        !profileDropdown.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className="w-[95%] fixed top-4 left-1/2 -translate-x-1/2 
    bg-linear-to-r from-green-500 to-green-700 rounded-2xl shadow-lg
     shadow-black/30 flex justify-between items-center h-15 px-4
     md:px-8 z-50"
    >
      <Link
        href={"/"}
        className="text-white font-extrabold text-1xl
      sm:text-3xl md:text-4xl tracking-wide hover:scale-105 transition-transform"
      >
        SnapCart
      </Link>
      <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md">
        <Search className=" text-gray-500 w-5 h-5 mr-2 " />
      </form>
      <div className="flex items-center gap-3 md:gap-6 relative">
        <div
          className="bg-white rounded-full w-11 h-11 flex items-center justify-center
      shadow-md hover:scale-105 transistion md:hidden"
          onClick={() => setSearchBarOpen((prev) => !prev)}
        >
          <Search className=" text-green-600 w-6 h-6 " />
        </div>

        <Link
          href={""}
          className=" relative bg-white rounded-full w-11 h-11
         flex items-center justify-center shadow-md haver:scale-105 transition"
        >
          <ShoppingCartIcon className="w-6 h-6 text-gray-600" />
          <span
            className=" absolute -top-1 -right-1 bg-red-500 text-white text-xs
          w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow "
          >
            0
          </span>
        </Link>

        <div className="relative" ref={profileDropdown}>
          <div
            className="bg-white rounded-full w-11 h-11 overflow-hidden flex items-center
         justify-center shadow-md hover:scale-105 transition-transform 
         "
            onClick={() => setOpen(!open)}
          >
            {user.image ? (
              <Image
                src={user.image}
                alt="user"
                fill
                className="object-cover rounded-full"
              />
            ) : (
              <User />
            )}
          </div>
          <AnimatePresence>
            {open && (
              <Motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute right-0 mt-3 bg-white rounded-2xl shadow-xl border
          border-gray-200 p-3 z-999 w-56"
              >
                <div className="flex  items-center gap-3 px-3 py-2  border-gray-100">
                  <div
                    className="bg-green-100 rounded-full w-11 h-11 flex items-center justify-center
                    relative overflow-hidden 
         "
                  >
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt="user"
                        fill
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <User />
                    )}
                  </div>
                  <div>
                    <div className="text-gray-800 font-semibold">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 capitaliz">
                      {user.role}
                    </div>
                  </div>
                </div>
                <Link
                  href={""}
                  className="flex items-center gap-2 px-3 hover:bg-green-100 rounded-lg
                text-gray-700 font-medium"
                  onClick={() => setOpen(false)}
                >
                  <Package className="e-5 h-5 text-green-600" />
                  My order
                </Link>
                <button
                  className="flex items-center gap-2 w-full text-left px-3 py-3 hover:bg-red-100 rounded-lg
                text-gray-700 font-medium"
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                >
                  <LogOut className="w-5 h-5 text-red-600" />
                  Log Out
                </button>
              </Motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {searchBarOpen && (
              <Motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex fixed top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-full shadow-lg z-40 items-center px-4 py-2"
              >
                <Search className=" text-gray-500 w-5 h-5 mr-2 " />
                <form className="grow">
                  <input
                    type="text"
                    placeholder="Search Groceries..."
                    className="w-full outline-none text-gray-700 "
                  />
                </form>
                <button onClick={() => setSearchBarOpen(false)}>
                  <X className="text-gray-500 w-5 h-5" />
                </button>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Nav;
