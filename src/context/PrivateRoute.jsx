import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';

const PrivateRoute = () => {
    const [auth] = useAuth();
  
    return auth?.token ? <Outlet /> : <Navigate to="/login" />;
  };
  
  export default PrivateRoute;