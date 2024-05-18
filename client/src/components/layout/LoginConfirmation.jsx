import React from "react";
import { useAuth } from "../features/AuthContext";

const LoginConfirmation = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome, {user ? user.username : "Guest"}!</h1>
      <p>Your login was successful. Enjoy your stay!</p>
    </div>
  );
};

export default LoginConfirmation;