"use client";
import axios from "axios";
import { ArrowLeft, Loader, PlusCircle, Upload } from "lucide-react";
import { motion } from "motion/react";
import { image } from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

const categories = [
  "Fruits & Vegetables",
  "Dairy & Eggs",
  "Rice & atta & Grains",
  "Snacks & Biscuits",
  "Beverages & drinks",
  "Personal Care",
  "Household Essentials",
  "Instant & pakeged Foods",
  "Baby & pet  Care",
];

const units = ["kg", "g", "litre", "ml", "piece", "pack"];

function AddGrocery() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState<string | null>("");
  const [backendImage, setBackendImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setBackendImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("unit", unit);
      formData.append("price", price);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.post("/api/admin/add-grocery", formData);
      console.log("Grocery added successfully:", result);
      setLoading(false);
    } catch (error) {
      console.error("Error adding grocery:", error);
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-green-50 to-white py-16 px-4 relative"
    >
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center
      gap-2 text-green-700 font-semibold bg-white px-4 py-2 rounded-full
      shadow-md  hover:bg-green-100 hover:shadow-lg transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden md:flex">Back to Admin</span>
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-2xl rounded-3xl border border-green-100 p-8
      w-full max-w-2xl"
      >
        <div className="flex flex-col itemas-center mb-8">
          <div className="flex items-center gap-3">
            <PlusCircle className="text-green-600 w-8 h-8" />
            <h1>Add Your Grocery</h1>
          </div>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Fill out the detials below to add a new grocery item.
          </p>
        </div>
        <form
          className="flex flex-col gap-6 w-full animate-fadeIn"
          onSubmit={handelSubmit}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Grocery Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="eg: Sweets,Milk..."
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full border
      border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400
      transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category
                <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Unit
                <span className="text-red-500">*</span>
              </label>
              <select
                name="Unit"
                onChange={(e) => setUnit(e.target.value)}
                value={unit}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              >
                <option value="">Select Category</option>
                {units.map((Unit) => (
                  <option key={Unit} value={Unit}>
                    {Unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Price
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="eg: 120..."
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full border
      border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400
      transition-all"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <label
              htmlFor="image"
              className="cursor-pointer flex items-center
              justify-center gap-2 bg-green-50 text-green-700
              font-semibold px-6 py-3 rounded-full hover:bg-green-100
              border border-green-200 rounded-xl transition-all w-full"
            >
              <Upload className="w-5 h-5" />
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              hidden
              onChange={handleImageChange}
            />
            {preview && (
              <Image
                src={preview}
                width={100}
                height={100}
                alt="image"
                className="rounded-xl shadow-md border border-gray-200 object-cover"
              />
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
            disabled={loading}
            className="mt-4 w-full bg-linear-to-r from-green-500
            to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg
            hover:shadow-xl disabled:opicity-60 transition-all flex
            items-center justify-center gap-2"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              "Add Grocery"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default AddGrocery;
