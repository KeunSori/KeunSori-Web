import axios from "axios";
import { removeToken } from "../../utils/jwt";
import { logout } from "../auth";

const API_URL = "https://keunsori-api.everdu.com/";

const authApi = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

authApi.interceptors.request.use(
  (config) => {
    const accessToken: string | null = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
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
      removeToken();
      logout();
      window.location.href = "/login";
    }

    throw error;
  }
);

export default authApi;
