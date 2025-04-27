import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth"; 

const PublicRoute = () => {
  const [auth] = useAuth();

  return auth?.token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
