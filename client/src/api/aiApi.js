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

export const extractExpense = async (text, token) => {
  const response = await axios.post(
    `${API}/extract-expense`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const transcribeAudio = async (audioBlob, token) => {

  const formData = new FormData();

  formData.append("audio", audioBlob, "recording.webm");

  const response = await axios.post(`${API}/transcribe`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;

};

export const getGoalPrediction = async (goalId, token) => {
  const response = await axios.get(`${API}/goal-prediction/${goalId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getGoalsAdvisor = async (token) => {
  const response = await axios.get(`${API}/goals-advisor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const sendChatMessage = async (message, history, token) => {
  const response = await axios.post(
    `${API}/chat`,
    { message, history },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getDashboardInsight = async (token) => {
  const response = await axios.get(`${API}/dashboard-insight`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};