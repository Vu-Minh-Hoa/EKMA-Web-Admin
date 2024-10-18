import { Box, CircularProgress, Modal } from '@mui/material';

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
    <Modal open={true}>
      <Box sx={style}>
        <CircularProgress />
      </Box>
    </Modal>
  );
};

export default LoadingComponent;
