import React, { useEffect, useState } from "react";
import {
  MantineProvider,
  Button,
  TextInput,
  Title,
  List,
  Text,
} from "@mantine/core";
import { io } from "socket.io-client";
import { theme } from "./theme";

// Connect to the server
const socket = io("http://localhost:8000"); // Ensure this matches your server URL

export default function App() {
  const [lobbyId, setLobbyId] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [joinedLobby, setJoinedLobby] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [inputLobbyId, setInputLobbyId] = useState("");

  useEffect(() => {
    // Log when the socket connects
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    // Handle lobby creation
    socket.on("lobby-created", (data: { lobbyId: string }) => {
      setLobbyId(data.lobbyId);
      setIsHost(true);
      console.log("Lobby created with ID:", data.lobbyId);
    });

    // Handle player joining
    socket.on("player-joined", (data: { playerId: string }) => {
      setPlayers((prev) => [...prev, data.playerId]);
      console.log("Player joined:", data.playerId);
    });

    // Handle game start event
    socket.on("game-started", () => {
      alert("The game has started!");
      // Logic to transition to the game screen can be added here
    });

    // Clean up the effect when the component unmounts
    return () => {
      socket.off("connect");
      socket.off("lobby-created");
      socket.off("player-joined");
      socket.off("game-started");
    };
  }, []);

  const createLobby = () => {
    socket.emit("create-lobby");
  };

  const joinLobby = () => {
    if (inputLobbyId) {
      socket.emit("join-lobby", inputLobbyId);
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
            <Text size="lg" weight={500}>
              Players:
            </Text>
            <List>
              {players.map((playerId) => (
                <List.Item key={playerId}>{playerId}</List.Item>
              ))}
            </List>
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
              onBlur={joinLobby}
              style={{ marginBottom: "20px" }}
            />
            {joinedLobby && (
              <Text color="blue">
                Waiting for the host to start the game...
              </Text>
            )}
          </div>
        )}
      </div>
    </MantineProvider>
  );
}
