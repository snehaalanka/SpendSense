import axios from "axios";

const API = "http://localhost:5000/api/dashboard";

export const getDashboardSummary = async (token) => {
  const response = await axios.get(`${API}/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getCategorySummary = async (token) => {
  const response = await axios.get(
    `${API}/category`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getWeeklySpending = async (token) => {

  const response = await axios.get(
    `${API}/weekly`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;

};