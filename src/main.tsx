import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/noto-sans-sc/wght.css";

import App from "./App";
import "./lib/i18n";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
