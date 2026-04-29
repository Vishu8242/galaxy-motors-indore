import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem("isAdmin");

  // ❌ Not logged in → go to login page
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  // ✅ Logged in → allow admin panel
  return children;
}

export default ProtectedRoute;
