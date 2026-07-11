import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const API = `${BASE_URL}/api/dashboard`;

export const getDashboardSummary = async (token, year, month) => {
  const response = await axios.get(`${API}/summary`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { year, month },
  });

  return response.data;
};

export const getCategorySummary = async (token, year, month) => {
  const response = await axios.get(`${API}/category`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { year, month },
  });

  return response.data;
};

export const getWeeklySpending = async (token) => {
  // stays month-independent — always real last 7 days
  const response = await axios.get(`${API}/weekly`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};