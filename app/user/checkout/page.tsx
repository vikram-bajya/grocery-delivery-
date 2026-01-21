"use client";
import dynamic from "next/dynamic";
import { RootState } from "@/redux/store";
import {
  ArrowLeft,
  Building,
  CreditCard,
  Home,
  Loader2Icon,
  Locate,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
  Search,
  Truck,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { input } from "motion/react-client";
import { NextResponse } from "next/server";

const CheckoutMap = dynamic(() => import("@/components/CheckoutMap1"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 flex items-center justify-center">
      Loading Map...
    </div>
  ),
});

function Checkout() {
  const router = useRouter();
  const { userData } = useSelector((state: RootState) => state.user);
  const { subTotal, deliveryFee, finalTotal, cartData } = useSelector(
    (state: RootState) => state.cart,
  );
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
    fullAddress: "",
  });

  const [paymentMethod, setPaymentMEthod] = useState<"cod" | "online">("cod");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [position, setposition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setposition([latitude, longitude]);
        },
        (err) => console.log("Location error:", err),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
      );
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setAddress((prev) => ({ ...prev, fullName: userData.name || "" }));
      setAddress((prev) => ({ ...prev, mobile: userData.mobile || "" }));
    }
  }, [userData]);

  const handalSearchQuery = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchLoading(true);
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: searchQuery });
    if (results) {
      setSearchLoading(false);
      setposition([results[0].y, results[0].x]);
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (!position) return;
      try {
        const { data } = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json`,
        );

        // Ensure address exists in response
        if (data && data.address) {
          setAddress((prev) => ({
            ...prev,
            city:
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "",
            state: data.address.state || "",
            pincode: data.address.postcode || "",
            fullAddress: data.display_name || "",
          }));
        }
      } catch (error) {
        console.log("api error:", error);
      }
    };
    fetchAddress();
  }, [position]);

  const handalCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setposition([latitude, longitude]);
        },
        (err) => console.log("Location error:", err),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
      );
    }
  };

  const handalCod = async () => {
    if (!position) {
      return null;
    }
    try {
      const result = await axios.post("/api/user/order", {
        userId: userData?._id,
        items: cartData.map((items) => ({
          grocery: items._id,
          quantity: items.quantity,

          name: items.name,

          price: items.price,
          unit: items.unit,
          image: items.image,
        })),
        totalAmount: finalTotal,
        address: {
          fullname: address.fullName,
          mobile: address.mobile,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          fullAddress: address.fullAddress,
          latitude: position[0],
          longitude: position[1],
        },
        paymentMethod,
      });

      router.push("/user/order-seccess");
    } catch (error) {
      return NextResponse.json(
        { massage: `error in handelCod ${error}` },
        { status: 500 },
      );
    }
  };

  return (
    <div className="w-[92%] md:w-[80%] mx-auto py-10 relative">
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="absolute left-0 top-2 flex items-center gap-2 text-green-700
      hover:text-green-800 font-semibold"
        onClick={() => router.push("/user/cart")}
      >
        <ArrowLeft size={16} />
        <span>Back to cart </span>
      </motion.button>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="etxt-3xl md:text-4xl font-bold text-green-700 text-center mb-10"
      >
        Checkout
      </motion.h1>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300
    p-6 border border-gray-100"
        >
          <h2
            className="text-xl font-semibold text-gray-800
            mb-4 flex items-center gap-2"
          >
            <MapPin className="text-green-700" />
            <span>Deliver Address</span>
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <User
                className="absolute left-3 top-3 text-green-600 "
                size={18}
              />
              <input
                type="text"
                value={address.fullName}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,

                    fullName: e.target.value,
                  }))
                }
                className="pl-10 w-full border rounded-lg  p-3 text-sm bg-gray-50"
              />
            </div>
            <div className="relative">
              <Phone
                className="absolute left-3 top-3 text-green-600 "
                size={18}
              />
              <input
                type="text"
                value={address.mobile}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    mobile: e.target.value,
                  }))
                }
                className="pl-10 w-full border rounded-lg  p-3 text-sm bg-gray-50"
              />
            </div>
            <div className="relative">
              <Home
                className="absolute left-3 top-3 text-green-600 "
                size={18}
              />
              <input
                type="text"
                value={address.fullAddress}
                placeholder="Full Address"
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    fullAddress: e.target.value,
                  }))
                }
                className="pl-10 w-full border rounded-lg  p-3 text-sm bg-gray-50"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="relative">
                <Building
                  className="absolute left-3 top-3 text-green-600 "
                  size={18}
                />
                <input
                  type="text"
                  value={address.city}
                  placeholder="City"
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  className="pl-10 w-full border rounded-lg  p-3 text-sm bg-gray-50"
                />
              </div>
              <div className="relative">
                <Navigation
                  className="absolute left-3 top-3 text-green-600 "
                  size={18}
                />
                <input
                  type="text"
                  value={address.state}
                  placeholder="State"
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      state: e.target.value,
                    }))
                  }
                  className="pl-10 w-full border rounded-lg  p-3 text-sm bg-gray-50"
                />
              </div>

              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-green-600 "
                  size={18}
                />
                <input
                  type="text"
                  value={address.pincode}
                  placeholder="PinCode"
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      pincode: e.target.value,
                    }))
                  }
                  className="pl-10 w-full border rounded-lg  p-3 text-sm bg-gray-50"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-3 ">
              <input
                type="text"
                placeholder="Search City or Area..."
                className="flex-1 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <button
                className="bg-green-600 text-white px-5 rounded-lg
              hover:bg-green-700 transition-all font-medium"
                onClick={handalSearchQuery}
              >
                {searchLoading ? (
                  <Loader2Icon size={16} className="animate-spin" />
                ) : (
                  "Search"
                )}
              </button>
            </div>
            <div
              className="relative mt-6 h-[300px] rounded-xl overflow-hidden 
            border border-gray-200 shadow-inner"
            >
              {position ? (
                <CheckoutMap position={position} setPosition={setposition} />
              ) : (
                <div className="h-full flex items-center justify-center">
                  Getting Location...
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.93 }}
                className="absolute bottom-4 right-4 bg-green-600 text-white shadow-lg
              rounded-full p-3 hover:bg-green-700 transition-all flex items-center justify-center z-[999]"
                onClick={handalCurrentLocation}
              >
                <LocateFixed size={22} />
              </motion.button>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all
          duration-300 p-6 border border-gray-100 h-fit"
        >
          <h2
            className="text-xl font-semibold text-gray-800 mb-4 flex items-center
          gap-2 "
          >
            {" "}
            <CreditCard className="text-green-600" /> Payment Method
          </h2>
          <div className="space-y-4 mb-6">
            <button
              className={`flex items-center gap-3 w-full border rounded-lg p-3
                transition-all ${
                  paymentMethod === "online"
                    ? "border-green-600 bg-green-50 shadow"
                    : "hover:bg-gray-50"
                }`}
              onClick={() => setPaymentMEthod("online")}
            >
              <CreditCard className="text-green-600" />
              <span className="font-medium text-gray-700">
                Pay Online (Stripe)
              </span>
            </button>
            <button
              onClick={() => setPaymentMEthod("cod")}
              className={`flex items-center gap-3 w-full border rounded-lg p-3
                transition-all ${
                  paymentMethod === "cod"
                    ? "border-green-600 bg-green-50 shadow"
                    : "hover:bg-gray-50"
                }`}
            >
              <Truck className="text-green-600" />
              <span className="font-medium text-gray-700">Cash On Deliver</span>
            </button>
          </div>
          <div className="border-t pt-4 text-gray-700 space-y-2 text-sm sm:text-base">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal</span>
              <span className="font-semibold text-green-600"> ₹{subTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Delivery Fee</span>
              <span className="font-semibold text-green-600">
                ₹{deliveryFee}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 ">
              <span className="font-semibold">Final Total</span>
              <span className="font-semibold text-green-600">
                ₹{finalTotal}
              </span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.93 }}
            className=" w-full mt-6 bg-green-600 text-white py-3 rounded-full
          hover:bg-green-700 transition-all font-semibold"
            onClick={() => {
              if (paymentMethod == "cod") {
                handalCod();
              } else {
                // handleOnlineOrder()
                null;
              }
            }}
          >
            {paymentMethod == "cod" ? "Place Order" : "Pay & Place Order"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Checkout;
