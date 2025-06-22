import axios from "axios";
import { logout } from "../auth";

const API_URL = import.meta.env.VITE_API_URL as string;

const authApi = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
});

authApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const statusCode = error.response?.status;
    alert(statusCode);

    if (statusCode === 401 || statusCode === 403) {
      logout();
      window.location.href = "/login";
    }

    throw error;
  }
);

export default authApi;
