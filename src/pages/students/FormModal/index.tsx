/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInputDate } from '../../../components/controller/controllerDatePicker';
import { FormInputText } from '../../../components/controller/controllerInputText';

interface ImportFileModalProps {
  isShowModal?: boolean;
  onUpload?: (data: any) => void;
  onClose?: () => void;
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '400px',
  minHeight: '400px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '5px',
};

const defaultValues = {
  maGV: '',
  hoTen: '',
  gioiTinh: '',
  khoaName: '',
};

const StudentsFormModal = ({
  isShowModal = false,
  onUpload,
  onClose,
}: ImportFileModalProps) => {
  const [open, setOpen] = useState(false);
  const [fileData, setFileData] = useState<any>();

  useEffect(() => {
    setOpen(isShowModal);
  }, [isShowModal]);

  const handleFileUpload = async (e: any) => {};

  const handleUploadFile = () => {
    onUpload && onUpload(fileData);
    handleClose();
  };

  const { handleSubmit, reset, control, setValue } = useForm<any>({
    defaultValues: defaultValues,
  });

  const onSubmit = (data: any) => console.log(data);

  const handleClose = () => {
    onClose && onClose();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant='h5'>Add Students</Typography>
        <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column', my: 4 }}>
          <FormInputText name='maGV' control={control} label='Mã giảng viên' />
          <FormInputText name='hoTen' control={control} label='Họ tên' />
          <FormInputText name='gioiTinh' control={control} label='Giới tính' />
          <FormInputText name='khoaName' control={control} label='Tên khoa' />
        </Box>

        {/* <FormInputDate name='dateValue' control={control} label='Date Input' /> */}
        <Button onClick={handleSubmit(onSubmit)} variant={'contained'}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default StudentsFormModal;
