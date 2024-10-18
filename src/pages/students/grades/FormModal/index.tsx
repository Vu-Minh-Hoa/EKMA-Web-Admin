/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormInputText } from '../../../components/controller/controllerInputText';
import { SelectComponent } from '../../../components/select';
import { CoureseGrad } from '../../../constants/common';
import useAcademyStore from '../../../store/academyStore';
import { FormInputDropdown } from '../../../components/controller/controllerSelectInput';
import DateRangePicker from '../../../components/dateRangePicker';
import { FormInputDate } from '../../../components/controller/controllerDatePicker';

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
  maSV: '',
  hoTen: '',
  gioiTinh: '',
  email: '',
  phone: '',
  khoaID: 0,
  lopCQ: '',
  ngaySinh: new Date(),
};

const schema = yup.object().shape({
  maSV: yup.string().required('Required field!'),
  hoTen: yup.string().required('Required field!'),
  email: yup.string().email().required('Required field!'),
  phone: yup.string().required('Required field!'),
  gioiTinh: yup.string().required('Required field!'),
  khoaID: yup.number().required('Required field!'),
  lopCQ: yup.string().required('Required field!'),
});

const StudentsFormModal = ({
  isShowModal = false,
  onSubmit,
  onClose,
  lopCQData,
  value,
}: any) => {
  const departments = useAcademyStore((state) => state.departments);
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, setValue } = useForm<any>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    handleSetValue();
  }, []);

  useEffect(() => {
    if (!isShowModal) {
      handleSetValue();
    }
  }, [isShowModal]);

  useEffect(() => {
    if (!value) {
      handleSetDefaultValue();
    } else {
      handleSetValue();
    }
  }, [value]);

  useEffect(() => {
    if (departments.length > 0 && lopCQData.length > 0) {
      setValue('khoaID', departments[0].id);
      setValue('lopCQ', lopCQData[0].id);
    }
  }, [departments, lopCQData]);

  const handleSetValue = () => {
    setValue('maSV', value?.maSV);
    setValue('hoTen', value?.hoTen);
    setValue('gioiTinh', value?.gioiTinh);
    setValue('ngaySinh', value?.ngaySinh);
    setValue('khoaID', value?.khoaID);
    setValue('phone', value?.phone);
    setValue('email', value?.email);
    setValue('lopCQ', value?.lopCQ);
  };

  const handleSetDefaultValue = () => {
    setValue('maSV', '');
    setValue('hoTen', '');
    setValue('gioiTinh', 'Nam');
    setValue('phone', '');
    setValue('email', '');
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
          <FormInputText name='hoTen' control={control} label='Họ tên' />
          <FormInputText name='maSV' control={control} label='Mã sinh viên' />
          <FormInputText name='phone' control={control} label='Số điện thoại' />
          <FormInputText name='email' control={control} label='Email' />
          <FormInputDate name='ngaySinh' control={control} label='Năm sinh' />
          <FormInputDropdown
            name='gioiTinh'
            control={control}
            label='Giới tính'
            options={[
              { id: 'Nam', label: 'Nam' },
              { id: 'Nữ', label: 'Nữ' },
            ]}
          />
          <FormInputDropdown
            name='lopCQ'
            control={control}
            label='Lớp chính quy'
            options={lopCQData}
          />
          <FormInputDropdown
            name='khoaID'
            control={control}
            label='Khoa'
            options={departments}
          />
        </Box>

        <Button onClick={handleSubmit(handleOnSubmit)} variant={'contained'}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default StudentsFormModal;
