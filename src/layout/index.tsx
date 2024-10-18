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
import CoursesSchedules from '../pages/schedules';
import LecturersManagement from '../pages/students';
import { post } from '../service/request';
import useLoadingStore from '../store/loadingStore';
import useUserStore from '../store/userStore';
import useAcademyStore from '../store/academyStore';
import CoursesGrades from '../pages/department';

function DashBoardLayout() {
  const { isLoading, setIsLoading } = useLoadingStore();
  const setDepartments = useAcademyStore((state) => state.setDepartments);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useQuery({
    queryKey: ['getData'],
    queryFn: async () => {
      // setIsLoading(true);
      const { data: userInfo } = await post({ url: 'user/detail' });
      const { data: departments } = await post({ url: 'khoa/getList' });
      setUserInfo(userInfo);
      setDepartments(departments);
      // setIsLoading(false);
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
              element={<Navigate to={STUDENTS_MANAMENT_LINK} replace={true} />}
            />
            <Route
              path={STUDENTS_MANAMENT_LINK}
              element={<LecturersManagement />}
            />
            <Route
              path={`${STUDENTS_MANAMENT_LINK}/:id`} // Add the new route with ID parameter
              element={<LecturersManagement />} // Specify the component to render
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
