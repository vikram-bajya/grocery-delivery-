"use client";

import axios from "axios";
import { ArrowRight, BikeIcon, User, UserCog } from "lucide-react";
import { motion } from "motion/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function EditRoleMobile() {
  const router = useRouter();
  const [role, setRole] = useState([
    { id: "admin", lable: "Admin", icon: UserCog },
    { id: "user", lable: "User", icon: User },
    { id: "deliveryBoy", lable: "Delivery Boy", icon: BikeIcon },
  ]);
  const [selectedRole, setSelectedRole] = useState("");
  const [mobile, setMobile] = useState("");
  const { update } = useSession();

  const handleEdit = async () => {
    try {
      const response = await axios.post("/api/user/edit-role-mobile", {
        role: selectedRole,
        mobile,
      });
      await update({ role: selectedRole });
      router.push("/");
    } catch (error) {
      console.error("Error updating role and mobile:", error);
    }
  };

  return (
    <div className="flex flex-col  min-h-screen p-6 w-full bg-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-green-700
        text-center mt-8"
      >
        Select Your Role
      </motion.h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10">
        {role.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          return (
            <motion.div
              key={role.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedRole(role.id)}
              className={`flex flex-col justify-center items-center
           w-48 h-44 p-6 border-2 rounded-2xl cursor-pointer transtion-all
            duration-300 ${
              isSelected
                ? "border-green-600 bg-green-100 shadow-lg"
                : "border-gray-300  bg-white hover:border-green-400"
            }`}
            >
              <Icon />
              <span>{role.lable}</span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-col items-center mt-10"
      >
        <label htmlFor="mobile" className="text-gray-700 font-medium mb-2">
          Enter Your Mobile No.
        </label>
        <input
          type="tal"
          id="mobile"
          name="mobile"
          className="w-64 md:w-80 px-4 py-3 border border-gray-300 rounded-xl p-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
          placeholder="eg. 1234567890"
          onChange={(e) => setMobile(e.target.value)}
        ></input>
      </motion.div>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`inline-flex items-center gap-2 font-semibold py-3 px-8 rounded-2xl shadow-md
          transition-all duration-200${
            selectedRole && mobile.length === 10
              ? " bg-green-600 text-white hover:bg-green-700 mt-10 mx-auto"
              : " bg-gray-300 text-gray-500 cursor-not-allowed mt-10 mx-auto"
          }`}
        onClick={handleEdit}
      >
        Go TO Home
        <ArrowRight />
      </motion.button>
    </div>
  );
}

export default EditRoleMobile;
