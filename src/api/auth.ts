import axiosInstance from "./axiosInstance";

export const login = async (studentId: string, password: string) => {
  const response = await axiosInstance.post(`/auth/login`, {
    studentId,
    password,
  });
  return response.data;
};

export const logout = async () => {
  return await axiosInstance.post('/auth/logout');
}
