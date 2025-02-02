import axios from "axios";
import { setToken } from "../utils/jwt";

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

        console.log("성공했다잉:", data);

        setToken(data);

        console.log("이제 다시 요청할게");
        console.log("악쎄스 토큰 여기: ", localStorage.getItem("accessToken"));
        const newAccessToken = localStorage.getItem("accessToken");
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
  }
);

export default axiosInstance;
