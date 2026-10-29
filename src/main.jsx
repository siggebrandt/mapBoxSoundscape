import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Navigation from "./components/navigation.jsx";
import GameStatsSlider from "./components/gameStatsSlider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navigation />
      <GameStatsSlider />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
