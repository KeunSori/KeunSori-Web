import axiosInstance from "./axiosInstance";

export const registerUser = async (data: {
  name: string;
  studentId: string;
  hongikgmail: string;
  password: string;
  passwordConfirm: string;
}) => {
  try {
    console.log("request content: ", data);
    const response = await axiosInstance.post("/signup", data);

    //test code
    console.log("이게 status 임: ", response.status);

    return response.data;
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }
};
