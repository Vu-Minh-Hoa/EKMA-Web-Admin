import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingComponent from '../components/loading';
import CustomSidebar from '../components/Sidebar';
import {
  COURSES_GRADES_MANAGEMENT_LINK,
  COURSES_SCHEDULES_MANAGEMENT_LINK,
  LECTURER_MANAGEMENT_LINK,
  STUDENT_MANAGEMENT_LINK,
} from '../links';
import CoursesSchedules from '../pages/schedules';
import LecturersManagement from '../pages/lecturer';
import { post } from '../service/request';
import useLoadingStore from '../store/loadingStore';
import useUserStore from '../store/userStore';
import useAcademyStore from '../store/academyStore';
import CoursesGrades from '../pages/department';
import StudentsManagement from '../pages/students';
import ConfirmModal from '../components/confirmModal';
import { useState } from 'react';

function DashBoardLayout() {
  const { isLoading, setIsLoading } = useLoadingStore();
  const setDepartments = useAcademyStore((state) => state.setDepartments);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useQuery({
    queryKey: ['getData'],
    queryFn: async () => {
      setIsLoading(true);
      const userInfo = await post({ url: 'user/detail' });
      const departmentsData = await post({ url: 'khoa/getList' });
      setUserInfo(userInfo);
      setDepartments(departmentsData);
      setIsLoading(false);
    },
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
              element={
                <Navigate to={LECTURER_MANAGEMENT_LINK} replace={true} />
              }
            />
            <Route
              path={LECTURER_MANAGEMENT_LINK}
              element={<LecturersManagement />}
            />
            <Route
              path={`${LECTURER_MANAGEMENT_LINK}/:id`} // Add the new route with ID parameter
              element={<LecturersManagement />} // Specify the component to render
            />
            <Route
              path={STUDENT_MANAGEMENT_LINK}
              element={<StudentsManagement />}
            />
            <Route
              path={`${STUDENT_MANAGEMENT_LINK}/grades/:id`} // Add the new route with ID parameter
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
