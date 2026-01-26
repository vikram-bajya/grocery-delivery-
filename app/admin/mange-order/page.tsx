"use client";
import AdminOrderCart from "@/components/AdminOrderCart";
import Order, { Iorder } from "@/models/order.model";
import axios from "axios";
import { ArrowLeft, Route } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

function ManageOrder() {
  const [orders, setOrders] = useState<Iorder[]>([]);
  const route = useRouter();
  useEffect(() => {
    const getOrders = async () => {
      try {
        const result = await axios.get("/api/admin/get-order");
        setOrders(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div
        className="fixed top-0 left-0 w-full backdrop-blur-lg 
          bg-white/70 shadow-sm border-b z-50"
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            className="p-2 bg-gray-100 rounded-full hover:bg-gary-200 active:scale-95
              transition"
            onClick={() => route.push("/")}
          >
            <ArrowLeft size={24} className="text-green-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Manage Order</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-16 space-y-8">
        <div className="space-y-6">
          {orders.map((order, index) => (
            <AdminOrderCart order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageOrder;
