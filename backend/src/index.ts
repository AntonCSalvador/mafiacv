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

interface Player {
  socketID: string;
  name: string;
  isAlive: boolean;
  role: string;
}

const lobbies = new Map<
  string,
  { hostId: string; players: Player[]; nominations: Set<string> }
>();

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Listen for creating a lobby
  socket.on("create-lobby", (name) => {
    const lobbyId = Math.random().toString(36).substring(2, 8); // Generate a random lobby ID

    socket.join(lobbyId);
    socket.data.lobbyId = lobbyId;

    lobbies.set(lobbyId, {
      hostId: socket.id,
      players: [{ socketID: socket.id, name: name, isAlive: true, role: "" }],
      nominations: new Set<string>(),
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

  const mafiaWin = (players: Player[]): boolean => {
    let mafiaCount = 0;
    let townCount = 0;
  
    players.forEach((player: Player) => {
      if (player.role === "mafia" && player.isAlive) {
        mafiaCount++;
      }
      else if (player.isAlive) {
        townCount++;
      }
    });

    return (mafiaCount / townCount) >= 0.5;
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

  socket.on("nominate", (lobbyId: string, playerName: string) => {
    if (!lobbies.has(lobbyId)) {
      socket.emit("lobby-not-found");
      return;
    }

    const lobby = lobbies.get(lobbyId);

    // 2 nominations are needed to start the voting phase
    if (lobby!.nominations.has(playerName)) {
      lobby!.nominations.clear();
      io.to(lobbyId).emit("defense", playerName);
      return;
    }

    lobby!.nominations.add(playerName);
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

      if (lobby.players.length === 0) {
        lobbies.delete(lobbyId);
        return;
      }

      lobbies.set(lobbyId, lobby);

      console.log("Players in lobby:", lobby.players);
      io.to(lobbyId).emit("players-updated", lobby.players);
    }
  });
});

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
