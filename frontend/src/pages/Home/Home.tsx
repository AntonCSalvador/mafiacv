import { useEffect, useState } from "react";
import {
  MantineProvider,
  Button,
  TextInput,
  Title,
  List,
  Text,
  Container,
} from "@mantine/core";
import { io } from "socket.io-client";
import { theme } from "../../theme";
import RoleSelection from "./RoleSelection";
import { createPlayer, Player } from "../../models/player";

// Connect to the server
export const socket = io("http://localhost:8000"); // Ensure this matches your server URL

export default function Home() {
  const [lobbyId, setLobbyId] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [joinedLobby, setJoinedLobby] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [inputLobbyId, setInputLobbyId] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    // Log when the socket connects
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    // Handle lobby creation
    socket.on(
      "lobby-created",
      (data: { lobbyId: string; playerId: string; name: string }) => {
        setLobbyId(data.lobbyId);
        setIsHost(true);
        setPlayers((prev) => [...prev, createPlayer(data.playerId, data.name)]);
      },
    );

    // Handle player joining
    socket.on("player-joined", (data: { playerId: string; name: string }) => {
      setPlayers((prev) => [...prev, createPlayer(data.playerId, data.name)]);
      console.log("Player joined:", data.playerId, data.name);
      console.log("Players:", players);
    });

    // Handle game start event
    socket.on("game-started", () => {
      alert("The game has started!");
      // Logic to transition to the game screen can be added here
    });

    // Handle user disconnect
    socket.on("user-disconnected", (disconnectedId) => {
      setPlayers((prevPlayers) =>
        prevPlayers.filter((playerId) => playerId !== disconnectedId),
      );
      console.log(`Player with ID ${disconnectedId} has disconnected.`);
    });

    socket.on("roles-assigned", (role) => {
      console.log("Role assigned:", role);
      setRole(role);
    });

    // Clean up the effect when the component unmounts
    return () => {
      socket.off("connect");
      socket.off("lobby-created");
      socket.off("player-joined");
      socket.off("game-started");
      socket.off("user-disconnected");
    };
  }, []);

  const createLobby = () => {
    if (name) {
      socket.emit("create-lobby", name);
    } else {
      console.log("Name is required to create a lobby");
    }
  };

  const joinLobby = () => {
    if (inputLobbyId) {
      socket.emit("join-lobby", inputLobbyId, name);
      setJoinedLobby(true);
      console.log("Joining lobby:", inputLobbyId);
    }
  };

  const startGame = () => {
    if (lobbyId) {
      socket.emit("start-game", lobbyId);
      console.log("Game started in lobby:", lobbyId);
    }
  };

  return (
    <MantineProvider theme={theme}>
      <div className="home">
        <div style={{ padding: "20px" }}>
          <Title order={2}>
            {lobbyId ? `Lobby ID: ${lobbyId}` : "Welcome to the Game!"}
          </Title>

          {lobbyId ? (
            <div>
              {isHost && (
                <Button
                  onClick={startGame}
                  color="blue"
                  style={{ marginBottom: "20px" }}
                >
                  Start Game
                </Button>
              )}
              <Text size="lg">Players:</Text>
              <List>
                {players.map((player) => (
                  <List.Item key={player.socketID}>{player.name}</List.Item>
                ))}
              </List>
              <RoleSelection players={players} />
            </div>
          ) : (
            <div>
              <Button
                onClick={createLobby}
                color="green"
                style={{ marginBottom: "20px" }}
              >
                Host Game
              </Button>
              <TextInput
                placeholder="Enter Lobby ID"
                value={inputLobbyId}
                onChange={(e) => setInputLobbyId(e.currentTarget.value)}
                style={{ marginBottom: "20px" }}
              />
              <TextInput
                label="Name"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => {
                  setName(event.currentTarget.value);
                }}
              />

              <Button
                onClick={() => {
                  if (name && inputLobbyId) {
                    joinLobby();
                  } else {
                    console.log("Name and join code are required");
                  }
                }}
                color="green"
              >
                Join Game
              </Button>
              {joinedLobby && (
                <Text color="blue">
                  Waiting for the host to start the game...
                </Text>
              )}
            </div>
          )}
        </div>
      </div>
    </MantineProvider>
  );
}
