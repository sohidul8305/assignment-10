import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
    if (!user) {
    return <Navigate to="/login" replace />;
    }

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (user) {
    return children;
  }
  

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
