import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem('token');
  const sessionToken = sessionStorage.getItem('token');

  return token ? (<Outlet />) : sessionToken? (<Outlet />) : <Navigate to="/login" />;
};

export default PrivateRoute;
