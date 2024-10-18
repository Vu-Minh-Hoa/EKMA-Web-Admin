import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import useTokenStore from '../store/tokenStore';

import { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = useTokenStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    // -disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  return token && children ? children : <Outlet />;
};

export default PrivateRoute;
