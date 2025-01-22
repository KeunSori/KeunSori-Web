import React, { createContext, useState, useEffect } from "react";
import { login, getUserData } from "../api/auth";
import { getToken, setToken, removeToken } from "../utils/jwt";

interface AuthContextProps {
  user: any;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      getUserData(token)
        .then(setUser)
        .catch(() => removeToken());
    }
  }, []);

  const loginUser = async (email: string, password: string) => {
    const data = await login(email, password);
    setToken(data.token);
    setUser(data.user);
  };

  const logoutUser = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
