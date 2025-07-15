import baseApi from "./Instance/baseApi";
import authApi from "./Instance/authApi";
import { memberStatus } from "@/data/user";

export const login = async (studentId: string, password: string): Promise<LoginResponse> => {
  const response = await baseApi.post(`/auth/login`, {
    studentId,
    password,
  });
  return response.data;
};

export const logout = async () => {
  return await authApi.post("/auth/logout");
};

// ToDo: 위치 옮기기
interface LoginResponse {
  name: string;
  studentId: string;
  status: memberStatus;
}