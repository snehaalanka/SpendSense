import axios from "axios";

// Backend Base URL
const API = axios.create({
    baseURL: "http://localhost:5000/api/auth",
});

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