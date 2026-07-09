import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { MonthProvider } from "./context/MonthContext";

import "./styles/global.css";
import "./styles/variables.css";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <AuthProvider>

      <ThemeProvider>

        <MonthProvider>

          <App />
          <ToastContainer />

        </MonthProvider>

      </ThemeProvider>

    </AuthProvider>

  </React.StrictMode>

);