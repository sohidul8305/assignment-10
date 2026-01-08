// routes/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children, role: requiredRole }) => {
  const { user, loading, role } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  if (requiredRole && role !== requiredRole)
    return <div className="text-center mt-10 text-red-500 font-bold">Access Denied</div>;

  return children;
};

export default PrivateRoute;
