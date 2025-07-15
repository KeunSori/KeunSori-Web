import React, { createContext, useState } from "react";
import { login, logout } from "../api/auth";
import { removeToken } from "../utils/jwt";
import { getUserInfo } from "../api/member";
import axios from "axios";

interface AuthContextProps {
  user: User;
  isLoading: boolean;
  loginUser: (
    studentId: string,
    password: string
  ) => Promise<{ success: boolean; message?: string; user?: User }>;
  logoutUser: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  isLoggedIn: boolean;
  memberStatus: memberStatus;
}

type memberStatus = "일반" | "관리자" | "승인 대기" | "알 수 없음";

export const AuthContext = createContext<AuthContextProps>({
  user: { isLoggedIn: false, memberStatus: "알 수 없음" },
  isLoading: true,
  loginUser: async () => ({ success: false, message: "초기값" }),
  logoutUser: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    isLoggedIn: false,
    memberStatus: "알 수 없음",
  });
  const [isLoading] = useState(true);

  // useEffect(() => {
  //   const token = getToken();

  //   if (token) {
  //     setUser({ isLoggedIn: true });
  //     setIsLoading(false);
  //   }
  // }, []);

  const loginUser = async (
    studentId: string,
    password: string
  ): Promise<{ success: boolean; message?: string; user?: User }> => {
    try {
      await login(studentId, password);
      const memberResponse = await getUserInfo();
      setUser({ isLoggedIn: true, memberStatus: memberResponse.status });
      return {
        success: true,
        user: { isLoggedIn: true, memberStatus: memberResponse.status },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("login failed:", error.response?.data || error.message);

        return {
          success: false,
          message:
            error.response?.data?.message || "로그인 실패. 다시 시도해주세요.",
        };
      }
      return { success: false, message: "예기치 않은 오류가 발생했습니다." };
    }
  };

  const logoutUser = async () => {
    removeToken();
    setUser({ isLoggedIn: false, memberStatus: "알 수 없음" });
    window.location.href = "/login";
    await logout();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
