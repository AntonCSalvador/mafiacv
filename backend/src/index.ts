import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
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
    socket.emit("lobby-created", { lobbyId, playerId: socket.id });
  });

  // Listen for players joining a lobby
  socket.on("join-lobby", (lobbyId) => {
    socket.join(lobbyId);
    socket.data.lobbyId = lobbyId; // Store the lobby ID in the socket object
    socket.to(lobbyId).emit("player-joined", { playerId: socket.id }); // Notify other players
  });

  // Listen for starting the game
  socket.on("start-game", (lobbyId) => {
    io.to(lobbyId).emit("game-started"); // Notify all players in the lobby that the game has started
  });

  const shuffleArray = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  interface AssignedRoles {
    [key: string]: string; // Key is the player's socket ID, value is their role
  }

  socket.on("select-roles", (roles: string[], players: string[]) => {
    // Shuffle the roles array to ensure randomness
    roles = shuffleArray(roles);

    // Create an object to store the assigned roles
    const assignedRoles: AssignedRoles = {};

    // Assign the shuffled roles to players
    players.forEach((playerId, index) => {
      // Assign a role from the shuffled list if available, otherwise "Town"
      const role = index < roles.length ? roles[index] : "Town";
      assignedRoles[playerId] = role;
    });

    console.log("Assigned roles:", assignedRoles);
    // Loop through each player and send their assigned role directly to them
    for (const playerId of players) {
      const role = assignedRoles[playerId];

      // Send the role directly to the player's socket
      io.to(playerId).emit("roles-assigned", role);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    io.to(socket.data.lobbyId).emit("user-disconnected", socket.id);
  });
});

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
