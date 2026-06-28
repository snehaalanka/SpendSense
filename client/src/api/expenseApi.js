import axios from "axios";

const API = "http://localhost:5000/api/expenses";

export const addExpense = async (expenseData, token) => {
  const response = await axios.post(API, expenseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};