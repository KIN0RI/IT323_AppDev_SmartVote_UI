import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("access_token");
  const role  = localStorage.getItem("userRole");

  if (!token) return <Navigate to="/" />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/unauthorized" />;

  return children;
}

export default ProtectedRoute;
