import React, { createContext, useState, useEffect } from "react";
import { login } from "../api/auth";
import { getToken, setToken, removeToken } from "../utils/jwt";

interface AuthContextProps {
  user: any;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User{
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const token = getToken();

    if (token) {
      setUser({isLoggedIn: false});

      // getUserData(token)
      //   .then(setUser)
      //   .catch(() => removeToken());
    }
  }, []);

  const loginUser = async (email: string, password: string) => {
    const data = await login(email, password);
    setToken(data.token);
    //setUser(data.user);
    setUser({isLoggedIn: true})
  };

  const logoutUser = () => {
    removeToken();
    setUser({isLoggedIn: false});
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
