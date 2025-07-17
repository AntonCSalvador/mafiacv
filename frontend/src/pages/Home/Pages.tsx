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
import { theme } from "../../theme";
import RoleSelection from "./RoleSelection";
import { createPlayer, Player } from "../../models/player";
import GoogleTTS from "../../GoogleTTS";
import { socket } from '../../utils/socket'

export default function Home(props) {
	const [role, setRole] = useState("");
	const [story, setStory] = useState("");

	useEffect(() => {
	
		// // Handle game start event
		// socket.on("game-started", () => {
		// 	alert("The game has started!");
		// 	// Logic to transition to the game screen can be added here
		// });

		

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
			// socket.off("connect");
			socket.off("lobby-created");
			socket.off("players-updated");
			socket.off("game-started");
		};
	}, []);

	const createLobby = () => {
    console.log("Name", props.name)
		if (props.name) {
			socket.emit("lobby:create", props.name);
		} else {
			console.log("Name is required to create a lobby");
		}
	};

	const joinLobby = () => {
		if (props.inputLobbyId) {
			socket.emit("lobby:join", props.inputLobbyId, props.name);
			props.setLobbyId(props.inputLobbyId);
			console.log("Joining lobby:", props.inputLobbyId);
		}
	};

	const startGame = () => {
		if (props.lobbyId) {
			socket.emit("start-game", props.lobbyId);
			console.log("Game started in lobby:", props.lobbyId);
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

  const players = props.players

	return (
		<MantineProvider theme={theme}>
			<div className="home">
				<div style={{ padding: "20px" }}>
					<Title order={2}>
						{props.lobbyId ? `Lobby ID: ${props.lobbyId}` : "Welcome to the Game!"}
					</Title>

					{props.lobbyId ? (
						<div>
							{props.isHost ? (
								<>
									<Button
										onClick={startGame}
										color="blue"
										style={{ marginBottom: "20px" }}
									>
										Start Game
									</Button>
									<RoleSelection lobbyId={props.lobbyId} />
								</>
							) : (
								<Text size="lg">Waiting for host to start the game...</Text>
							)}
							<Text size="lg">Players:</Text>
							<List>
								{players.map((player: Player) => (
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
								value={props.inputLobbyId}
								onChange={(e) => props.setInputLobbyId(e.currentTarget.value)}
								style={{ marginBottom: "20px" }}
							/>
							<TextInput
								label="Name"
								placeholder="Enter your name"
								value={props.name}
								onChange={(event) => {
									props.setName(event.currentTarget.value);
								}}
							/>

							<Button
								onClick={() => {
									if (props.name && props.inputLobbyId) {
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
