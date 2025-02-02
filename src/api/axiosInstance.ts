import axios from "axios";
import { setToken, removeToken } from "../utils/jwt";

const API_URL = "https://keunsori-api.everdu.com/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response?.status;

    if ((statusCode === 401 || statusCode === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          console.warn("리프레시 토큰이 없습니다. 로그아웃 처리.");
          return Promise.reject(error);
        }

        const { data } = await axios.post(
          "https://keunsori-api.everdu.com/auth/reissue",
          {},
          { headers: { "Refresh-Token": refreshToken } }
        );

        setToken(data);

        const newAccessToken = localStorage.getItem("accessToken");

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패", refreshError);
        removeToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    throw error;
  }
);

export default axiosInstance;
