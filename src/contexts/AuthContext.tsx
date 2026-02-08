import React, { createContext, useEffect, useState } from "react";
import { login, logout, authCheck } from "../api/auth";
import axios from "axios";

interface AuthContextProps {
  user: User;
  isLoading: boolean;
  loginUser: (
    studentId: string,
    password: string,
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
  const [isLoading, setIsLoading] = useState(true);

  // 앱이 리부트될 때마다
  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const res = await authCheck();

        if (res.data) {
          setUser({ isLoggedIn: true, memberStatus: res.data.status });
        }
      } catch (error) {
        console.error(error);
        setUser({ isLoggedIn: false, memberStatus: "알 수 없음" });
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  const loginUser = async (
    studentId: string,
    password: string,
  ): Promise<{ success: boolean; message?: string; user?: User }> => {
    try {
      const memberResponse = await login(studentId, password);
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
    try {
      await logout();
    } catch (e) {
      // ignore logout error
      console.error(e);
    }
    setUser({ isLoggedIn: false, memberStatus: "알 수 없음" });
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginUser, logoutUser }}>
      {!isLoading ? children : <div>인증 정보 확인 중...</div>}
    </AuthContext.Provider>
  );
};
