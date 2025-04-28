import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-white text-center">Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  return children;
}
