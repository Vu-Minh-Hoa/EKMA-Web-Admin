/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { FormInputText } from '../../../components/controller/controllerInputText';
import { CoureseGrad } from '../../../constants/common';

interface ImportFileModalProps {
  isShowModal?: boolean;
  data?: any;
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
  maSV: '',
  hoTen: '',
  gioiTinh: '',
  khoaName: '',
};

const schema = yup.object().shape({
  maSV: yup.string().required('Required field!'),
  hoTen: yup.string().required('Required field!'),
  gioiTinh: yup.string().required('Required field!'),
  khoaName: yup.string().required('Required field!'),
});

const StudentsFormModal = ({
  isShowModal = false,
  onClose,
  data,
}: ImportFileModalProps) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [khoaSelected, setKhoaSelected] = useState<any>(
    CoureseGrad.khoa[0].id,
  );
  const [lopSelection, setLopSelection] = useState<any>(CoureseGrad.lop);
  const [lopSelected, setLopSelected] = useState<any>('');
  const { handleSubmit, reset, control, setValue } = useForm<any>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      const selectedData = data.find((item: any) => item.id === id);
      if (selectedData) {
        Object.keys(selectedData).forEach((key) => {
          setValue(key, selectedData[key]);
        });
      }
      setKhoaSelected(selectedData.khoa);
      setLopSelected(selectedData.lop);
    } else {
      reset(defaultValues);
    }
  }, [id]);

  useEffect(() => {
    setOpen(isShowModal);
  }, [isShowModal]);

  useEffect(() => {
    handleFilterData()
  }, [khoaSelected, lopSelected]);


  const handleFilterData = () => {

    const filteredLop = CoureseGrad.lop.filter((item) => {
      return khoaSelected === item.khoa;
    });

    setLopSelection(filteredLop);
  };

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
          <FormInputText name='maSV' control={control} label='Mã giảng viên' />
          <FormInputText name='hoTen' control={control} label='Họ tên' />
          <FormInputText name='gioiTinh' control={control} label='Giới tính' />
          <FormControl sx={{ width: '100%', marginRight: '10px' }}>
            <InputLabel size='small' id='demo-simple-select-label'>
              Khóa
            </InputLabel>
            <Select
              size='small'
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={khoaSelected}
              label='Age'
              onChange={(e) => setKhoaSelected(e.target.value)}
            >
              {CoureseGrad.khoa.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel size='small' id='demo-simple-select-label'>
              Môn
            </InputLabel>
            <Select
              size='small'
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={lopSelected}
              label='Age'
              onChange={(e) => setLopSelected(e.target.value)}
            >
              {lopSelection.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
