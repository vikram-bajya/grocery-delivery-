"use client";
import MapView from "@/components/MapView";
import { RootState } from "@/redux/store";
import { LatLngExpression } from "leaflet";
import {
  ArrowLeft,
  Building,
  Home,
  MapPin,
  Navigation,
  Navigation2,
  Phone,
  Search,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import axios from "axios";

const icon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// 2. Define DraggableMarker OUTSIDE the main component
// Passing position and setter as props
const DraggableMarker = ({
  position,
  setPosition,
}: {
  position: LatLngExpression;
  setPosition: (pos: [number, number]) => void;
}) => {
  const map = useMap();

  // Auto-pan map when position changes
  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: true });
  }, [position, map]);

  return (
    <Marker
      position={position}
      draggable={true}
      icon={customIcon}
      eventHandlers={{
        dragend: (e: L.LeafletEvent) => {
          const marker = e.target as L.Marker;
          const { lat, lng } = marker.getLatLng();
          setPosition([lat, lng]);
        },
      }}
    >
      <Popup>Delivering Here</Popup>
    </Marker>
  );
};

function Checkout() {
  const router = useRouter();
  const { userData } = useSelector((state: RootState) => state.user);
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
    fullAddress: "",
  });

  const [position, setposition] = useState<[number, number] | null>(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setposition([latitude, longitude]);
        },
        (err) => {
          console.log("Location error:", err);
        },
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

  useEffect(() => {
    const fetchAddress = async () => {
      if (!position) return null;
      try {
        const { data } = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format:json`,
        );
        console.log(data);
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
      } catch (error) {
        console.log("api error:", error);
      }
    };
    fetchAddress();
  }, [position]);

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
                    fullName: address.fullName || "",
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
                    mobile: address.mobile || "",
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
                    fullAddress: address.fullAddress || "",
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
                      city: address.city || "",
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
                      state: address.state || "",
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
                      pincode: address.pincode || "",
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
              />
              <button
                className="bg-green-600 text-white px-5 rounded-lg
              hover:bg-green-700 transition-all font-medium"
              >
                Search
              </button>
            </div>
            <div
              className="relative mt-6 h-[300px] rounded-xl overflow-hidden 
            border border-gray-200 shadow-inner"
            >
              {position && (
                <MapContainer
                  center={position as LatLngExpression}
                  zoom={17}
                  scrollWheelZoom={true}
                  className="h-[400px] w-full rounded-lg z-0"
                  style={{ height: "400px", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <DraggableMarker
                    position={position}
                    setPosition={setposition}
                  />
                </MapContainer>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Checkout;
