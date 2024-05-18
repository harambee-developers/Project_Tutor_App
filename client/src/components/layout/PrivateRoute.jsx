import React from "react";
import { useAuth } from "../features/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  // Otherwise, render the component passed to element
  return <Component {...rest} />;
};

export default PrivateRoute;
