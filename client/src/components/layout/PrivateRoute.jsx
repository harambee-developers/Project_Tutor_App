import React, { useEffect, useState } from "react";
import { useAuth } from "../features/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      // Since tokens are now in HTTP-only cookies, no need to manually handle them here
      try {
        const response = await axios.get(`http://localhost:7777/api/auth/verify-token`);
        
        if (response.status === 200 && response.data.valid) {
          setIsVerified(true);
        } else {
          console.log("Token verification failed, redirecting to login.");
          logout();
        }
      } catch (error) {
        console.error("Token verification error:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [logout]);

  if (loading) {
    return <div>Loading...</div>; // or a spinner, placeholder, etc.
  }

  if (!isVerified || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
