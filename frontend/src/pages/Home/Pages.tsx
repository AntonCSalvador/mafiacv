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
import GoogleTTS from "../../GoogleTTS";

// Connect to the server
export const socket = io("http://localhost:8000"); // Ensure this matches your server URL

export default function Home() {
  const [lobbyId, setLobbyId] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [inputLobbyId, setInputLobbyId] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [story, setStory] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    // Handle lobby creation
    socket.on(
      "lobby-created",
      (data: { lobbyId: string; players: Player[] }) => {
        setLobbyId(data.lobbyId);
        setIsHost(true);
        setPlayers(data.players);
      }
    );

    socket.on("players-updated", (players: Player[]) => {
      setPlayers(players);
    });

    // Handle game start event
    socket.on("game-started", () => {
      alert("The game has started!");
      // Logic to transition to the game screen can be added here
    });

    // Handle user disconnect
    socket.on("user-disconnected", (disconnectedId) => {
      setPlayers((prevPlayers) =>
        prevPlayers.filter((playerId) => playerId !== disconnectedId)
      );
      console.log(`Player with ID ${disconnectedId} has disconnected.`);
    });

    // save story
    // socket.on("story-generated", (story) => {
    //   console.log(story);
    //   setStory(story);
    // });

    socket.on("roles-assigned", (role) => {
      console.log("Role assigned:", role);
      setRole(role);
    });

    // Clean up the effect when the component unmounts
    return () => {
      socket.off("connect");
      socket.off("lobby-created");
      socket.off("players-updated");
      socket.off("game-started");
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
      setLobbyId(inputLobbyId);
      console.log("Joining lobby:", inputLobbyId);
    }
  };

  const startGame = () => {
    if (lobbyId) {
      socket.emit("start-game", lobbyId);
      console.log("Game started in lobby:", lobbyId);
    }
  };

  const generateStory = () => {
    socket.emit(
      "generate-story",
      "reirere",
      ["ryder", "wilson", "lazzy"],
      "lazzy",
      "ryder",
      "the beach"
    );
    console.log("story created!");
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
              {isHost ? (
                <>
                  <Button
                    onClick={startGame}
                    color="blue"
                    style={{ marginBottom: "20px" }}
                  >
                    Start Game
                  </Button>
                  <RoleSelection lobbyId={lobbyId} />
                </>
              ) : (
                <Text size="lg">Waiting for host to start the game...</Text>
              )}
              <Text size="lg">Players:</Text>
              <List>
                {players.map((player) => (
                  <List.Item key={player.socketID}>{player.name}</List.Item>
                ))}
              </List>
              <Title>{role}</Title>
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

              {/* {joinedLobby && (
                <Text color="blue">
                  Waiting for the host to start the game...
                </Text>
              )} */}

              <Button
                onClick={() => {
                  generateStory();
                }}
                color="green"
                style={{ marginLeft: "20px" }}
              >
                Generate Story
              </Button>

              <GoogleTTS placeholderText={story} />
            </div>
          )}
        </div>
      </div>
    </MantineProvider>
  );
}
