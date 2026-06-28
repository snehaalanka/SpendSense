import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
  <AuthProvider>
    <App />

    <ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="dark"
  toastStyle={{
    borderRadius: "14px",
    background: "#fefefe",
    color: "#4630f2",
    fontSize: "15px",
    fontWeight: "500",
  }}
  progressStyle={{
    background: "#7C3AED",
  }}
/>

  </AuthProvider>
</React.StrictMode>
);