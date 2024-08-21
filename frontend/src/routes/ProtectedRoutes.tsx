import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  // const { authenticated } = useAuth();
  const { authenticated } = { authenticated: true };

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
