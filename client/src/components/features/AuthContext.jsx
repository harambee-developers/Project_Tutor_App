import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
      // // Here, replace with your actual login API endpoint
      // const response = await axios.post("/login", { username, password });
      // if (response.status === 200) {
      //   const { user, accessToken } = response.data;
      //   localStorage.setItem("accessToken", accessToken); // Save token
      //   localStorage.setItem("user", JSON.stringify(user)); // Save user data
      //   setUser(user);
      //   console.log("Login is successful", user);
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
    // localStorage.removeItem("accessToken"); // Remove token
    setUser(null);
    console.log("logout successful!");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    // const token = localStorage.getItem("accessToken");
    if (storedUser) {
      // Optionally verify the token's validity with your backend here
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
