/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormInputDate } from '../../../../components/controller/controllerDatePicker';
import { FormInputText } from '../../../../components/controller/controllerInputText';
import { FormInputDropdown } from '../../../../components/controller/controllerSelectInput';
import useAcademyStore from '../../../../store/academyStore';

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
  monHoc: '',
  diemTP1: '',
  diemTP2: '',
  diemTK: '',
};

const schema = yup.object().shape({
  monHoc: yup.string().required('Required field!'),
  diemTP1: yup.string().required('Required field!'),
  diemTP2: yup.string().required('Required field!'),
  diemTK: yup.string().required('Required field!'),
});

const GradesFormModal = ({
  isShowModal = false,
  onSubmit,
  onClose,
  value,
}: any) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, setValue } = useForm<any>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    handleSetValue();
  }, []);

  useEffect(() => {
    if (!value) {
      handleSetDefaultValue();
    } else {
      handleSetValue();
    }
  }, [value]);

  useEffect(() => {
    if (!value) {
      handleSetDefaultValue();
    } else {
      handleSetValue();
    }
  }, [value]);

  const handleSetValue = () => {
    setValue('monHoc', value?.monHoc);
    setValue('diemTP1', value?.diemTP1);
    setValue('diemTP2', value?.diemTP2);
    setValue('diemTK', value?.diemTK);
  };

  const handleSetDefaultValue = () => {
    setValue('monHoc', '');
    setValue('diemTP1', '');
    setValue('diemTP2', '');
    setValue('diemTK', '');
  };

  useEffect(() => {
    setOpen(isShowModal);
  }, [isShowModal]);

  const handleOnSubmit = (data: any) => {
    onSubmit && onSubmit(data);
  };

  const handleClose = () => {
    onClose && onClose();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant='h5'>Add Students</Typography>
        <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column', my: 4 }}>
          <FormInputText
            disabled={true}
            name='monHoc'
            control={control}
            label='Môn học'
          />
          <FormInputText
            name='diemTP1'
            control={control}
            label='Điểm thành phần 1'
          />
          <FormInputText
            name='diemTP2'
            control={control}
            label='Điểm thành phần 2'
          />
          <FormInputText
            name='diemTK'
            control={control}
            label='Điểm tổng kết'
          />
        </Box>

        <Button onClick={handleSubmit(handleOnSubmit)} variant={'contained'}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default GradesFormModal;
