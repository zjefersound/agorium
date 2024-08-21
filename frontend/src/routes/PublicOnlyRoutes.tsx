import { Navigate, Outlet } from "react-router-dom";

const PublicOnlyRoutes = () => {
  // const { authenticated } = useAuth();
  const { authenticated } = { authenticated: false };

  return authenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicOnlyRoutes;
