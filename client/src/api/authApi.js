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

// Register User - Added '/auth' prefix to match your backend route structure
export const registerUser = async (userData) => {
    const response = await API.post("/auth/register", userData);
    return response.data;
};

// Login User - Added '/auth' prefix to match your backend route structure
export const loginUser = async (userData) => {
    const response = await API.post("/auth/login", userData);
    return response.data;
};

// Get Logged In User Profile - Keep as /auth/profile if nested under auth, or leave as is if it's a base route
export const getUserProfile = async (token) => {
    const response = await API.get("/auth/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export default API;