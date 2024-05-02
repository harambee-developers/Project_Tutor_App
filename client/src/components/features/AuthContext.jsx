import React, { createContext, useContext, useState } from "react";

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

    console.log("Logging in....");
    if (username === "TestUser" && password === "testpassword") {
      const userData = { username: "TestUser" };
      setUser(userData);
      console.log("Login is successful", userData);
    } else {
      console.error("Login Failed!");
    }

    // if (response.ok) {
    //   const { accessToken } = await response.json();

    //   localStorage.setItem("accessToken", accessToken);
    //   setUser({ username });
    // }
  };

  const logout = () => {
    console.log("Logging out.....");
    // localStorage.removeItem("accessToken");
    setUser(null);
    console.log("logout successful!");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
