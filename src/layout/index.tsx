import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import CustomSidebar from '../components/Sidebar';
import { Box } from '@mui/material';
import {
  COURSES_GRADES_MANAGEMENT_LINK,
  COURSES_SCHEDULES_MANAGEMENT_LINK,
  STUDENTS_MANAMENT_LINK,
} from '../links';
import StudentsManagement from '../pages/students';
import CoursesSchedules from '../pages/schedules';
import CoursesGrades from '../pages/grades';

function DashBoardLayout() {
  return (
    <Box>
      <CssBaseline />
      <Box className='app'>
        <CustomSidebar />
        <Box
          component='main'
          className='content'
          style={{ marginLeft: 240, fontSize: 20, padding: '14px 30px' }}
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
              path={COURSES_GRADES_MANAGEMENT_LINK}
              element={<CoursesGrades />}
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
