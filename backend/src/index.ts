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

interface Player {
  socketID: string;
  name: string;
  isAlive: boolean;
  role: string;
}

const lobbies = new Map<string, { hostId: string; players: Player[] }>();

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Listen for creating a lobby
  socket.on("create-lobby", () => {
    const lobbyId = Math.random().toString(36).substring(2, 8); // Generate a random lobby ID

    socket.join(lobbyId);
    socket.data.lobbyId = lobbyId;

    lobbies.set(lobbyId, {
      hostId: socket.id,
      players: [{ socketID: socket.id, name: name, isAlive: true, role: "" }],
    });

    socket.emit("lobby-created", {
      lobbyId,
      players: lobbies
        .get(lobbyId)!
        .players.map(({ name, isAlive }) => ({ name, isAlive })),
    });
  });

  socket.on("join-lobby", (lobbyId: string, name: string) => {
    if (!lobbies.has(lobbyId)) {
      socket.emit("lobby-not-found");
      return;
    }

    socket.join(lobbyId);
    socket.data.lobbyId = lobbyId;

    lobbies.get(lobbyId)!.players.push({
      socketID: socket.id,
      name: name,
      isAlive: true,
      role: "",
    });

    // Notify all players in the lobby to update the players list
    io.to(lobbyId).emit(
      "players-updated",
      lobbies
        .get(lobbyId)!
        .players.map(({ name, isAlive }) => ({ name, isAlive })),
    );
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

  socket.on("select-roles", (roles: string[], lobbyId: string) => {
    roles = shuffleArray(roles);

    if (!lobbies.has(lobbyId)) {
      socket.emit("lobby-not-found");
      return;
    }

    const players = lobbies.get(lobbyId)!.players;
    players.forEach((player, index) => {
      // Assign a role from the shuffled list if available, otherwise "Town"
      const role = index < roles.length ? roles[index] : "Town";
      player.role = role;
    });

    for (const player of players) {
      io.to(player.socketID).emit("roles-assigned", player.role);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    const lobbyId = socket.data.lobbyId;
    const lobby = lobbies.get(lobbyId);

    // If socket is in game lobby, remove them
    if (lobby) {
      lobby.players = lobby.players.filter(
        (player) => player.socketID !== socket.id,
      );

      lobbies.set(lobbyId, lobby);

      console.log("Players in lobby:", lobby.players);
      io.to(lobbyId).emit("players-updated", lobby.players);
    }
  });

  // Handle end of night story creation
  socket.on("generate-story", async (lobbyId: string, players: string[], killed: string, saved: string, setting: string) => {
    let prompt = "";
  
    if (killed === saved) {
      prompt = `Write a story about a group of people. The setting is ${setting}. The players' names are ${players}. During the night, in our story, ${killed} was almost killed by 'the mafia'. Write the story relative to our setting. Make it interesting and funny. Keep it under 50 words. Involve at least 3 characters in the story. Use misdirection as to not reveal who almost died until the end of the story. It should be clear that the medic saved the person and that nobody died. Keep it under 50 words.`;
    } else {
      prompt = `Write a story about a murder. The setting of this murder is ${setting}. The players' names are ${players}. During the night, in our story, ${killed} was killed by 'the mafia'. Write the story of the mafia killing this person relative to our setting. Make it interesting and funny. Keep it under 50 words. Involve at least 3 characters in the story. Use misdirection as to not reveal who died until the end of the story. It should be clear who died in the story. Keep it under 50 words.`;
    }
  
    const storyResponse = await getStory(prompt);
    socket.emit("story-generated", storyResponse);
  });
});

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});