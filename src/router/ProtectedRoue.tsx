import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import useTokenStore from '../store/tokenStore';

import { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('token');
  const { setToken } = useTokenStore();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/login');
  //   } else {
  //     setToken(token);
  //     navigate('/');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [token, navigate]);

  // return token && children ? children : <Outlet />;
  return children ? children : <Outlet />;
};

export default PrivateRoute;
