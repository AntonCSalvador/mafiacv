import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Ryder from "./pages/RyderModal/Home";
import Michelle from "./pages/MHome/Home";
import Rules from "./pages/Rules/Home";
import Lobby from "./pages/Lobby/About";
import Night from "./pages/Night/Night";
import Kitchen from "./pages/Kitchen/About";
import Day from "./pages/DayText/About";

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
