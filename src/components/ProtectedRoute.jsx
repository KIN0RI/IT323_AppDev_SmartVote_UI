import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const role = localStorage.getItem("userRole");

  if (!role) return <Navigate to="/" />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/unauthorized" />;

  return children;
}

export default ProtectedRoute;