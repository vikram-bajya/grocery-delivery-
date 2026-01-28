import express from "express"; // Fixed typo: "ëxpress" -> "express"
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { Socket } from "dgram";
import axios from "axios";

dotenv.config();

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;

// ... imports

io.on("connection", (socket) => {
  console.log("user connect:", socket.id);

  socket.on("identity", async (userId) => {
    console.log("User ID received:", userId);

    try {
      await axios.post(`${process.env.NEXT_BASE_URL}/api/socket/connect`, {
        userId,
        socketId: socket.id,
        secret: process.env.SOCKET_SECRET || "my_secure_secret_123", // 👈 Add this
      });
      console.log("Updated socket ID in DB");
    } catch (err) {
      console.error("Error updating socket ID:", err.message);
    }
  });

  // ... rest of code
});
