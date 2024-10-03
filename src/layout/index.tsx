import { useEffect } from 'react';
import useRouter from '../hooks/useRouter';
import useTokenStore from '../store/tokenStore';
import CssBaseline from '@mui/material/CssBaseline';
import { Sidebar } from 'react-pro-sidebar';
import { Route, Routes } from 'react-router-dom';
import { INVOICE_LINK, USER_LINK } from '../links';

function DashBoardLayout() {
  const { token } = useTokenStore();
  const { pushRoute } = useRouter();

  useEffect(() => {
    if (!token) pushRoute('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <CssBaseline />
      <div className='app'>
        <Sidebar />
        <main className='content' style={{ paddingTop: 50 }}>
          <Routes>
            {/* <Route path='/*' element={<HomePage />} /> */}
            <Route path={`${INVOICE_LINK}/:username`} />
            <Route path={`${USER_LINK}`} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default DashBoardLayout;
