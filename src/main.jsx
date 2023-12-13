import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.scss";
import { SkeletonTheme } from "react-loading-skeleton";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SkeletonTheme baseColor="#182034" highlightColor="#222e49">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SkeletonTheme>
);
