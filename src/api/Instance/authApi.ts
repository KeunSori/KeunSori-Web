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

    if (statusCode === 401 || statusCode === 403) {
      logout();
      console.error("인증 오류 발생:", error);
    }

    throw error;
  }
);

export default authApi;
