import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const getUserProfile = async (token) => {

  const response = await axios.get(
    `${API}/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;

};

export const updateProfile = async (
  data,
  token
) => {

  const response = await axios.put(
    `${API}/profile`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const changePassword = async (passwordData, token) => {

  const response = await axios.put(
    `${API}/change-password`,
    passwordData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;

};
