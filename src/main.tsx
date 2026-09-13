import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/animations.css";
import "./styles/cards.css";
import "./styles/candle.css";
import "./styles/responsive.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("LUNA: #root element was not found.");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);