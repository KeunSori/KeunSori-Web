import { memberStatus } from "@/data/user";
import baseApi from "@/api/Instance/baseApi";

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await baseApi.get("/members/me");
    return response.data;
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }
};

type UserInfo = {
  name: string;
  studentId: string;
  email: string;
  status: memberStatus;
};