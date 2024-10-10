import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Ryder from "./pages/RyderModal/Home";
import Michelle from "./pages/MHome/Home";
import Lobby from "./pages/Lobby/About";


export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Ryder" element={<Ryder />} />
          <Route path="/Michelle" element={<Michelle />} />
          <Route path="/Lobby" element={<Lobby />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
