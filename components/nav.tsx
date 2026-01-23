"use client";
import {
  Boxes,
  ClipboardCheck,
  Cross,
  LogOut,
  Menu,
  Package,
  Plus,
  PlusCircle,
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
import { create } from "domain";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartData } = useSelector((state: RootState) => state.cart);
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

  const slideBar = menuOpen
    ? createPortal(
        <AnimatePresence>
          <Motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="fixed top-0 left-0 h-full w-[69%] sm:w-[60%]
            z-9999 bg-gradient-to-b from-green-800/90 to-green-700/80
            to-green-900/90 backdrop-blur-xlborder-r border-green-400/20
            shadow-[0_0_50px_rgba(0,255,200,0.3)] flex flex-col
            p-6 text-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h1 className="font-extrabold text-2xl tracking-wide text-white/90">
                Admin Panel
              </h1>
              <button
                className="text-white/80 hover:text-red-400 text-2xl font-bold transition"
                onClick={() => setMenuOpen(false)}
              >
                <X className="w-9 h-8" />
              </button>
            </div>

            <div
              className="flex items-center gap-3 p-3 mt-3 rounded-xl bg-white/10
            hover:bg-white/20 transition-all shadow-inner"
            >
              <div
                className="relative w-12 h-12 rounded-full overflow-hidden 
              border border-green-400/60 shadow-lg"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="user"
                    fill
                    className="object-cover rounded-full h-30"
                  />
                ) : (
                  <User />
                )}
              </div>
              <h2 className="text-lg font-semibold text-white">{user.name}</h2>
              <p className="text-xs text-green-200 capitalize tracking-wide">
                {user.role}
              </p>
            </div>

            <div className=" flex flex-col gap-3 font-midium mt-6  ">
              <Link
                href={"/admin/add-grocrey"}
                className="flex items-center gap-3 p-3 rounded-lg
               bg-white/10 hover:bg-white/20 hover:pl-4 transition-all"
              >
                <PlusCircle className=" w-5 h-5 " />
                Add Grocery
              </Link>
              <Link
                href={""}
                className=" flex items-center gap-3 p-3 rounded-lg
               bg-white/10 hover:bg-white/20 hover:pl-4 transition-all"
              >
                <Boxes className="w-5 h-5" />
                View Grocery
              </Link>
              <Link
                href={""}
                className="flex items-center gap-3 p-3 rounded-lg
               bg-white/10 hover:bg-white/20 hover:pl-4 transition-all"
              >
                <ClipboardCheck className="w-5 h-5" />
                Manage Grocery
              </Link>
            </div>

            <div className="my-5 border-t border-white/20"></div>
            <div
              className="flex items-center gap-3 text-red-300 font-semibold
             mt-auto hover:bg-red-500/20 p-3 rounded-lg transition-all"
              onClick={async () => await signOut({ callbackUrl: "/" })}
            >
              <LogOut className="w-5 h-5 text-red-300" />
              Log Out
            </div>
          </Motion.div>
        </AnimatePresence>,
        document.body
      )
    : null;
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

      {user.role === "user" && (
        <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md">
          <Search className=" text-gray-500 w-5 h-5 mr-2 " />
        </form>
      )}

      <div className="flex items-center gap-3 md:gap-6 relative">
        {user.role === "user" && (
          <>
            <div
              className="bg-white rounded-full w-11 h-11 flex items-center justify-center
      shadow-md hover:scale-105 transistion md:hidden"
              onClick={() => setSearchBarOpen((prev) => !prev)}
            >
              <Search className=" text-green-600 w-6 h-6 " />
            </div>

            <Link
              href={"/user/cart"}
              className=" relative bg-white rounded-full w-11 h-11
         flex items-center justify-center shadow-md haver:scale-105 transition"
            >
              <ShoppingCartIcon className="w-6 h-6 text-gray-600" />
              <span
                className=" absolute -top-1 -right-1 bg-red-500 text-white text-xs
          w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow "
              >
                {cartData.length}
              </span>
            </Link>
          </>
        )}

        {user.role == "admin" && (
          <>
            <div className="hidden md:flex items-center gap-4  ">
              <Link
                href={"/admin/add-grocrey"}
                className="flex items-center gap-2 bg-white text-green-700
              font-semibold px-4 py-2 rounded-full hover:bg-green-100
              transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                Add Grocery
              </Link>
              <Link
                href={""}
                className="flex items-center gap-2 bg-white text-green-700
              font-semibold px-4 py-2 rounded-full hover:bg-green-100
              transition-all"
              >
                <Boxes className="w-5 h-5" />
                View Grocery
              </Link>
              <Link
                href={""}
                className="flex items-center gap-2 bg-white text-green-700
              font-semibold px-4 py-2 rounded-full hover:bg-green-100
              transition-all"
              >
                <ClipboardCheck className="w-5 h-5" />
                Manage Grocery
              </Link>
            </div>
            <div
              className=" md:hidden bg-white rounded-full w-10 h-10 flex items-center justify-center 
            shadow-md hover:scale-105 transition-transform"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <Menu className="w-6 h-6 text-green-600 " />
            </div>
          </>
        )}

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
                sizes="(max-width: 768px) 100vw, 33vw"
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
                {user.role == "user" && (
                  <>
                    <Link
                      href={"/user/my-orders"}
                      className="flex items-center gap-2 px-3 hover:bg-green-100 rounded-lg
                text-gray-700 font-medium"
                      onClick={() => setOpen(false)}
                    >
                      <Package className="e-5 h-5 text-green-600" />
                      My order
                    </Link>
                  </>
                )}
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
      {slideBar}
    </div>
  );
}

export default Nav;
