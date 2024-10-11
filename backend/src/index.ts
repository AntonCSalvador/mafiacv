import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { getStory } from "./text-gen"; // Import your getStory function
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

  socket.on(
    "select-roles",
    (lobbyId: string, roles: string[], players: string[]) => {
      socket.join(lobbyId);

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

      // Emit the assigned roles back to the lobby
      io.to(lobbyId).emit("roles-assigned", assignedRoles);
    },
  );

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  // Handle end of night story creation
  socket.on("generate-story", async (lobbyId: string, players: string[], killed: string, saved: string, setting: string) => {
    let prompt = "";
  
    if (killed === saved) {
      prompt = `Write a story about a group of people. The setting is ${setting}. The players' names are ${players}. During the night, in our story, ${killed} was almost killed by 'the mafia'. Write the story relative to our setting. Make it interesting and funny. Keep it under 50 words. Involve at least 3 characters in the story. Use misdirection as to not reveal who almost died until the end of the story. It should be clear that the medic saved the person and that nobody died. Keep it under 50 words.`;
    } else {
      prompt = `Write a story about a murder. The setting of this murder is ${setting}. The players' names are ${players}. During the night, in our story, ${killed} was killed by 'the mafia'. Write the story of the mafia killing this person relative to our setting. Make it interesting and funny. Keep it under 50 words. Involve at least 3 characters in the story. Use misdirection as to not reveal who died until the end of the story. It should be clear who died in the story. Keep it under 50 words.`;
    }
  
    try {
      const storyResponse = await getStory(prompt);
      console.log(storyResponse);
      io.to(lobbyId).emit("story-generated", storyResponse); // Emit the story to the lobby
    } catch (error) {
      console.error("Error generating story:", error);
      io.to(lobbyId).emit("story-error", { error: "Failed to generate the story." });
    }
  });
});

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});