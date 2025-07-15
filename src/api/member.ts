import { memberStatus } from "@/data/user";
import authApi from "@/api/Instance/authApi";

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    alert("getUserInfo 진입");
    const response = await authApi.get("/members/me");
    alert("getUserInfo 성공");
    return response.data;
  } catch (error) {
    alert("getUserInfo 실패" + error);
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