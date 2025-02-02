import axiosInstance from "./axiosInstance";

export const registerUser = async (data: {
  name: string;
  studentId: string;
  hongikgmail: string;
  password: string;
  passwordConfirm: string;
}) => {
  try {
    const response = await axiosInstance.post("/signup", data);
    return response.data;
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }
};
