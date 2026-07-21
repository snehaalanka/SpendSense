import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const API = `${BASE_URL}/api/goals`;

export const getGoals = async (token) => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const createGoal = async (goal, token) => {
  const res = await axios.post(API, goal, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteGoal = async (id, token) => {
  const res = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const updateGoal = async (id, goal, token) => {
  const res = await axios.put(`${API}/${id}`, goal, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const addMoney = async (id, amount, token) => {
  const res = await axios.patch(
    `${API}/${id}/add-money`,
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
