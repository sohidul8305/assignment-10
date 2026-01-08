// routes/UserRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const UserRoute = ({ children }) => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user || role !== "user") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserRoute;
