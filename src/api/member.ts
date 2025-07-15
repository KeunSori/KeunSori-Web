import { memberStatus } from "@/data/user";
import authApi from "@/api/Instance/authApi";

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await authApi.get("/members/me");
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