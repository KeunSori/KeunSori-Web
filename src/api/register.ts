import baseApi from "./Instance/baseApi";

export const registerUser = async (data: {
  name: string;
  studentId: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  try {
    const response = await baseApi.post("/signup", data);
    return response.data;
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }
};
