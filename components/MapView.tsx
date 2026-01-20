"use client";
import { LatLngExpression } from "leaflet";
import React from "react";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function MapView({
  position,
}: {
  position: [number, number] | null;
}) {
  if (!position) return <p>Loading map...</p>;
  return <div></div>;
}
