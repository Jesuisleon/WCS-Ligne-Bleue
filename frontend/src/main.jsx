import "./setup.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { AuthContextProvider } from "./context/AuthContext";
import { NavigationContextProvider } from "./context/NavigationContext";

// AXIOS CONFIG

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NavigationContextProvider>
        <App />
      </NavigationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
