"use client";
import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    if (!token) {
      let flag = false;
      if (typeof window !== "undefined") {
        if (localStorage.getItem("token")) {
          const parsed = JSON.parse(localStorage.getItem("token"));
          console.log(parsed.time < new Date().getTime());
          if (parsed.time < new Date().getTime()) {
            localStorage.removeItem("token");
            setStatus("unauthenticated");
            getUser();
          } else {
            setToken(localStorage.getItem("token"));
            setStatus("authenticated");
            flag = true;
          }
        }
      }
      if (!flag) {
        setStatus("unauthenticated");
      }
    }
  }, []);
  const value = { token, setToken, status, setStatus };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
