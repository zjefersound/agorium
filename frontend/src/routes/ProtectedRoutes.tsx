import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutes() {
  // const { authenticated } = useAuth();
  const { authenticated } = { authenticated: true };

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
