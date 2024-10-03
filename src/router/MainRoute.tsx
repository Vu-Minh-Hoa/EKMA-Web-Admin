import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './ProtectedRoue';
import { LOGIN_LINK } from '../links';
import LoginPage from '../pages/login';
import DashBoardLayout from '../layout';

const MainRoute = () => {
  const authToken = localStorage.getItem('token');
  //   const dispatch = useDispatch();

  useEffect(() => {
    if (authToken) {
      //   dispatch(setAccountToken(authToken));
    }
  }, [authToken]);

  return (
    <Routes>
      <Route path={LOGIN_LINK} element={<LoginPage />} />
      <Route
        path='/*'
        element={
          <PrivateRoute>
            <DashBoardLayout />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default MainRoute;
