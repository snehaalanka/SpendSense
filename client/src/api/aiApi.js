import axios from "axios";

const API = "http://localhost:5000/api/ai";

export const getAnalysis = async (token) => {
  const response = await axios.get(`${API}/analysis`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const generateReport = async (token) => {
  const response = await axios.post(
    `${API}/report`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};