import React, { createContext, useState } from "react";
import { login, logout } from "../api/auth";
import { removeToken } from "../utils/jwt";
import axios from "axios";
import { removeMemberStatus } from "../utils/jwt";

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
  memberStatus: string;
}

export const AuthContext = createContext<AuthContextProps>({
  user: { isLoggedIn: false, memberStatus: "" },
  isLoading: true,
  loginUser: async () => ({ success: false, message: "초기값" }),
  logoutUser: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ isLoggedIn: false, memberStatus: "" });
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
      const data = await login(studentId, password);
      setUser({ isLoggedIn: true, memberStatus: data.status });
      console.log("로그인 성공:", data.status);
      return { success: true, user: { isLoggedIn: true, memberStatus: data.status } };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("login failed:", error.response?.data || error.message);

        return {
          success: false,
          message: error.response?.data?.message || "로그인 실패. 다시 시도해주세요.",
        };
      }
      return { success: false, message: "예기치 않은 오류가 발생했습니다." };
    }
  };

  const logoutUser = async () => {
    removeToken();
    setUser({ isLoggedIn: false, memberStatus: "" });
    removeMemberStatus();
    console.log("해치웠나?");
    window.location.href = "/login";
    await logout();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
