import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Ryder from "./pages/RyderModal/Home";
import Michelle from "./pages/MHome/Home";
import Lobby from "./pages/Lobby/About";
import React from 'react';
import GoogleTTS from './GoogleTTS';

const App: React.FC = () => {
  return (
    <div>
      <h1>Text to Speech App</h1>
      <GoogleTTS />
    </div>
  );
};

export default App;
