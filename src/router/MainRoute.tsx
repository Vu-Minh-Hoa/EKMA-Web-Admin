import { Route, Routes } from 'react-router-dom';
import DashBoardLayout from '../layout';
import { LOGIN_LINK } from '../links';
import LoginPage from '../pages/login';
import PrivateRoute from './ProtectedRoue';

const MainRoute = () => {
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
