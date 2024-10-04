import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import CustomSidebar from '../components/Sidebar';
import { INVOICE_LINK, USER_LINK } from '../links';
import { Box } from '@mui/material';

function DashBoardLayout() {
  return (
    <Box>
      <CssBaseline />
      <Box className='app'>
        asdawd
        <CustomSidebar />
        <Box component='main' className='content' style={{ paddingTop: 50 }}>
          <Routes>
            {/* <Route path='/*' element={<HomePage />} /> */}
            <Route path={`${INVOICE_LINK}/:username`} />
            <Route path={`${USER_LINK}`} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default DashBoardLayout;
