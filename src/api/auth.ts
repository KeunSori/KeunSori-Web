import baseApi from "./Instance/baseApi";
import authApi from "./Instance/authApi";
import { memberStatus } from "@/data/user";
import { AxiosResponse } from "axios";

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

export const passwordUpdateLink = async (studentId: string, email: string): Promise<AxiosResponse> => {
    const response = await authApi.post(`/auth/password/update-link/send`, {
      studentId,
      email,
    });
    return response;
};

// ToDo: 위치 옮기기
interface LoginResponse {
  name: string;
  studentId: string;
  status: memberStatus;
}
