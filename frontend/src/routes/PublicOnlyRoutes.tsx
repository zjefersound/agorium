import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function PublicOnlyRoutes() {
  const { authenticated } = useAuth();

  return authenticated ? <Navigate to="/" replace /> : <Outlet />;
}
