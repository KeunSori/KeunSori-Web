import React, { createContext, useState, useEffect } from "react";
import { login, logout } from "../api/auth";
import { getToken, setToken, removeToken } from "../utils/jwt";
import axios from "axios";

interface AuthContextProps {
  user: User;
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
  loginUser: async () => ({ success: false, message: "초기값" }),
  logoutUser: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ isLoggedIn: false });

  useEffect(() => {
    const token = getToken();

    if (token) {
      setUser({ isLoggedIn: false });

      // getUserData(token)
      //   .then(setUser)
      //   .catch(() => removeToken());
    }
  }, []);

  const loginUser = async (
    studentId: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const data = await login(studentId, password);
      setToken(data);
      setUser({ isLoggedIn: true });
      return { success: true };
    } catch (error) {
      console.log(" 일단 에러 받았어~ ");
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
    await logout();
    removeToken();
    setUser({ isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
