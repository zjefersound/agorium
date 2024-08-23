import { Navigate, Outlet } from "react-router-dom";

export function PublicOnlyRoutes() {
  // const { authenticated } = useAuth();
  const { authenticated } = { authenticated: false };

  return authenticated ? <Navigate to="/" replace /> : <Outlet />;
}
