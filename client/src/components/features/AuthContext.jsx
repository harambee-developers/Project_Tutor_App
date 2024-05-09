import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    // API requrest to authenticate user and receive token

    // const response = await fetch("api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "appilcation/json" },
    //   body: JSON.stringify({ username, password }),
    // });

    // if (response.ok) {
    //   const { accessToken } = await response.json();

    //   localStorage.setItem("accessToken", accessToken);
    //   setUser({ username });
    // }

    console.log("Logging in....");
    if (username === "TestUser" && password === "testpassword") {
      const userData = { username: "TestUser" };
      setUser(userData);
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Login is successful", userData);
    } else {
      console.error("Login Failed!");
    }
  };

  const logout = () => {
    console.log("Logging out.....");
    localStorage.removeItem("user");
    setUser(null);
    console.log("logout successful!");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
