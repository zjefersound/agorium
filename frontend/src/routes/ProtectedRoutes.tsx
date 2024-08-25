import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoutes() {
  const { authenticated } = useAuth();

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
