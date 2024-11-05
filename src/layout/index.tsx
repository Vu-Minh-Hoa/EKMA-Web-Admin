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
import LecturersManagement from '../pages/lecturer';
import CoursesSchedules from '../pages/schedules';
import StudentsManagement from '../pages/students';
import { post } from '../service/request';
import useAcademyStore from '../store/academyStore';
import useLoadingStore from '../store/loadingStore';
import useUserStore from '../store/userStore';
import GradesManagement from '../pages/students/grades';

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
              path={STUDENT_MANAGEMENT_LINK}
              element={<StudentsManagement />}
            />
            <Route
              path={COURSES_GRADES_MANAGEMENT_LINK}
              element={<GradesManagement />}
            />
            <Route
              path={COURSES_SCHEDULES_MANAGEMENT_LINK}
              element={<CoursesSchedules />}
            />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default DashBoardLayout;
