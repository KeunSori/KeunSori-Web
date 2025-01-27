import React, { createContext, useState, useEffect } from "react";
import { login, logout } from "../api/auth";
import { getToken, setToken, removeToken } from "../utils/jwt";
import axios from "axios";

interface AuthContextProps {
  user: User;
  loginUser: (studentId: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User{
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: {isLoggedIn: false},
  loginUser: async () => false,
  logoutUser: () => {}
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({isLoggedIn: false});

  useEffect(() => {
    const token = getToken();

    if (token) {
      setUser({isLoggedIn: false});

      // getUserData(token)
      //   .then(setUser)
      //   .catch(() => removeToken());
    }
  }, []);

  const loginUser = async (studentId: string, password: string): Promise<boolean> => {
    try {
    const data = await login(studentId, password);
    setToken(data);
    setUser({isLoggedIn: true});
    return true;
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.error("login failed:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      return false;
    }
  };

  const logoutUser = async () => {
    await logout();
    removeToken();
    setUser({isLoggedIn: false});
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
