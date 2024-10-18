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
  khoaID: 0,
};

const schema = yup.object().shape({
  maGV: yup.string().required('Required field!'),
  hoTen: yup.string().required('Required field!'),
  gioiTinh: yup.string().required('Required field!'),
  khoaID: yup.number().required('Required field!'),
});

const StudentsFormModal = ({
  isShowModal = false,
  onSubmit,
  onClose,
  value,
}: any) => {
  const departments = useAcademyStore((state) => state.departments);
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, setValue } = useForm<any>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!value) {
      handleSetDefaultValue();
    } else {
      handleSetValue();
    }
  }, [value]);

  useEffect(() => {
    if (!isShowModal) {
      handleSetDefaultValue();
    }
  }, [isShowModal]);

  useEffect(() => {
    if (departments.length > 0) {
      setValue('khoaID', departments[0].id);
    }
  }, [departments]);

  const handleSetValue = () => {
    setValue('maGV', value.maGV);
    setValue('hoTen', value.hoTen);
    setValue('gioiTinh', value.gioiTinh);
    setValue('khoaID', value.khoaID);
  };

  const handleSetDefaultValue = () => {
    setValue('maGV', '');
    setValue('hoTen', '');
    setValue('gioiTinh', 'Nam');
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
          <FormInputText name='maGV' control={control} label='Mã giảng viên' />
          <FormInputText name='hoTen' control={control} label='Họ tên' />
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
