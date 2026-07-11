import axios from "axios";

// 1. Get the correct URL dynamically
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// 2. Pass it into axios.create using the correct 'baseURL' configuration key
const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
});

export default API;
// Register User
export const registerUser = async (userData) => {
    const response = await API.post("/register", userData);
    return response.data;
};

// Login User
export const loginUser = async (userData) => {
    const response = await API.post("/login", userData);
    return response.data;
};

// Get Logged In User Profile
export const getUserProfile = async (token) => {
    const response = await API.get("/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};