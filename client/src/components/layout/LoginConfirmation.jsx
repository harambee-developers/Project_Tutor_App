import React, { useEffect } from "react";
import { useAuth } from "../features/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginConfirmation = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard')
    }, 3000) // redirect after 3 seconds

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="text-center min-h-screen">
      <h1 className="mt-10">Welcome, {user ? user.username : "Guest"}!</h1>
      <p>Your login was successful. Enjoy your stay!</p>
    </div>
  );
};

export default LoginConfirmation;