import baseApi from "./Instance/baseApi";
import authApi from "./Instance/authApi";

export const login = async (studentId: string, password: string) => {
  const response = await baseApi.post(`/auth/login`, {
    studentId,
    password,
  });
  return response.data;
};

export const logout = async () => {
  return await authApi.post("/auth/logout");
};
