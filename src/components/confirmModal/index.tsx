/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '600px',
  minHeight: '400px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '5px',
};

const ConfirmModal = ({
  isShowModal = false,
  text,
  onConfirm,
  onClose,
}: any) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isShowModal);
  }, [isShowModal]);

  const handleConFirm = () => {
    const res = onConfirm && onConfirm();
    if (res) setOpen(false);
  };

  const handleClose = () => {
    onClose && onClose();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant='h5' gutterBottom>
          Xác nhận
        </Typography>
        <Box sx={{ my: 2 }}>
          <Typography variant='h6' gutterBottom>
            Xác nhận {text}
          </Typography>
        </Box>
        <Box>
          <Button variant='contained' color='primary' onClick={handleConFirm}>
            Xác nhận
          </Button>
          <Button variant='contained' color='error' onClick={handleClose}>
            Hủy
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
