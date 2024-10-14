/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingComponent from '../components/loading';
import CustomSidebar from '../components/Sidebar';
import {
  COURSES_GRADES_MANAGEMENT_LINK,
  COURSES_SCHEDULES_MANAGEMENT_LINK,
  STUDENTS_MANAMENT_LINK,
} from '../links';
import CoursesGrades from '../pages/grades';
import CoursesSchedules from '../pages/schedules';
import StudentsManagement from '../pages/students';
import { get } from '../service/request';
import useLoadingStore from '../store/loadingStore';

function DashBoardLayout() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const { data } = useQuery({
    queryKey: ['getData'],
    queryFn: () => get({ url: 'userData' }),
  });

  return (
    <Box>
      <CssBaseline />
      <Box className='app'>
        <CustomSidebar />
        {isLoading && <LoadingComponent />}
        <Box
          component='main'
          className='content'
          style={{ marginLeft: 240, fontSize: 20, padding: '20px 30px' }}
        >
          <Routes>
            <Route
              path='*'
              element={<Navigate to={STUDENTS_MANAMENT_LINK} replace />}
            />
            <Route
              path={STUDENTS_MANAMENT_LINK}
              element={<StudentsManagement />}
            />
            <Route
              path={`${STUDENTS_MANAMENT_LINK}/:id`} // Add the new route with ID parameter
              element={<StudentsManagement />} // Specify the component to render
            />
            <Route
              path={COURSES_GRADES_MANAGEMENT_LINK}
              element={<CoursesGrades />}
            />
            <Route
              path={`${COURSES_GRADES_MANAGEMENT_LINK}/:id`} // Add the new route with ID parameter
              element={<CoursesGrades />} // Specify the component to render
            />
            <Route
              path={COURSES_SCHEDULES_MANAGEMENT_LINK}
              element={<CoursesSchedules />}
            />
            <Route
              path={`${COURSES_SCHEDULES_MANAGEMENT_LINK}/:id`} // Add the new route with ID parameter
              element={<CoursesSchedules />} // Specify the component to render
            />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default DashBoardLayout;
