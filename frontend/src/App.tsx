import { useState, useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./index.css";
import { socket } from "./utils/socket";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Pages";
import About from "./pages/About/Pages";
import Ryder from "./pages/RyderModal/Pages";
import Michelle from "./pages/MHome/Pages";
import Rules from "./pages/Rules/Pages";
import Lobby from "./pages/Lobby/Pages";
import Night from "./pages/Night/Night";
import Kitchen from "./pages/Kitchen/Pages";
import Day from "./pages/DayText/Pages";

import { Player } from "./models/player";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [lobbyId, setLobbyId] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState("");
  const [inputLobbyId, setInputLobbyId] = useState("");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log('User is connected')
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function createLobby(data: { lobbyId: string; players: Player[] }) {
      setLobbyId(data.lobbyId);
      setIsHost(true);
      setPlayers(data.players);
    }

    function updatePlayers(players: Player[]) {
      setPlayers(players)
    }

    // function removePlayer(id: number) {
    //   setPlayers()
    // }

    // Handle user disconnect
		// socket.on("user-disconnected", (disconnectedId) => {
		// 	setPlayers((prevPlayers) =>
		// 		prevPlayers.filter((playerId) => playerId !== disconnectedId)
		// 	);
		// 	console.log(`Player with ID ${disconnectedId} has disconnected.`);
		// });

    // Handle lobby creation
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('lobby:create', createLobby);
    socket.on('players:update', updatePlayers);


    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('lobby:create');
    }
  }, [])

  const homeProps = {
    name,
    lobbyId,
    players,
    isHost,
    inputLobbyId,
    setInputLobbyId,
    setName,
    setPlayers,
    setIsHost,
    setLobbyId
  }

  return (
    <MantineProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home {...homeProps} />}/>
          <Route path="/about" element={<About />} />
          <Route path="/Ryder" element={<Ryder />} />
          <Route path="/Michelle" element={<Michelle />} />
          <Route path="/Rules" element={<Rules />} />
          <Route path="/Lobby" element={<Lobby />} />
          <Route path="/Night" element={<Night />} />
          <Route path="/Kitchen" element={<Kitchen />} />
          <Route path="/Day" element={<Day />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
