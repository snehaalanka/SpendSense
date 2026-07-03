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
export const getExpenses = async (token) => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const deleteExpense = async (id, token) => {
  const response = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const updateExpense = async (
  id,
  expenseData,
  token
) => {

  const response = await axios.put(
    `${API}/${id}`,
    expenseData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;

};