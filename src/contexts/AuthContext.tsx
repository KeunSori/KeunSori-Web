import React, { createContext, useState, useEffect } from "react";
import { login, logout } from "../api/auth";
import axios from "axios";
import { setMemberStatus, removeMemberStatus } from "../utils/memberStatus";

interface AuthContextProps {
  user: User;
  isLoading: boolean;
  loginUser: (
    studentId: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logoutUser: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: { isLoggedIn: false },
  isLoading: true,
  loginUser: async () => ({ success: false, message: "초기값" }),
  logoutUser: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ isLoggedIn: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const token = getToken();
    // if (token) {
    //   setUser({ isLoggedIn: true });
    //   setIsLoading(false);
    // }

    // refresh 로직 api 기반 마련되면 바꿀거임
    setUser({ isLoggedIn: false });
    setIsLoading(false);
  }, []);

  const loginUser = async (
    studentId: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const data = await login(studentId, password); // 지금 data 반환 안 됨

      setUser({ isLoggedIn: true });

      if (data.memberStatus === "관리자") {
        setMemberStatus("관리자");
      } else if (data.memberStatus === "일반") {
        setMemberStatus("일반");
      } else {
        // setMemberStatus("승인 대기");

        // 회원 유형 정보 조회 api 만들어지면 바꿀거임
        setMemberStatus("일반");
      }
      return { success: true };
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
    setUser({ isLoggedIn: false });
    removeMemberStatus();
    window.location.href = "/login";
    await logout();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
