import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./index.css";
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

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
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
