import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token")); // Update token state when it changes
  }, []);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
