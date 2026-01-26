import express from "express"; // Fixed typo: "ëxpress" -> "express"
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { Socket } from "dgram";

dotenv.config();

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000; 

const io=new Server(server,{
    cors:{
        origin:process.env.NEXT_BASE_URL
    }
})

//use on for listing and emit for send 
io.on("connection",(socket)=>{
    console.log("user connect",socket.id)

    socket.on("diconnect",()=>{
 console.log("user Disconnect",socket.id)
    })
})







server.listen(port, () => {
    
    console.log(`Server started at http://localhost:${port}`); 
});