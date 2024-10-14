import { Box, CircularProgress } from '@mui/material';

const style = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  zIndex: '9999',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'none',
  overflow: 'hidden',
};

const LoadingComponent = () => {
  return (
    <Box sx={style}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingComponent;
