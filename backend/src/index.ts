import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors"; // Make sure to install this package if you haven't already

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust to your client URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Listen for creating a lobby
  socket.on("create-lobby", () => {
    const lobbyId = Math.random().toString(36).substring(2, 8); // Generate a random lobby ID
    socket.join(lobbyId);
    socket.emit("lobby-created", { lobbyId }); // Notify the host with the lobby ID
  });

  // Listen for players joining a lobby
  socket.on("join-lobby", (lobbyId) => {
    socket.join(lobbyId);
    socket.to(lobbyId).emit("player-joined", { playerId: socket.id }); // Notify other players
  });

  // Listen for starting the game
  socket.on("start-game", (lobbyId) => {
    io.to(lobbyId).emit("game-started"); // Notify all players in the lobby that the game has started
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
