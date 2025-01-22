import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const getUserData = async (token: string) => {
  const response = await axios.get(`${API_URL}/auth/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
