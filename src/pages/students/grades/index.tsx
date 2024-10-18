/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadFileOutlined } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, Button, TextField, Typography } from '@mui/material';
import StudentsFormModal from './FormModal';
import ImportFileModal from './importFileModal';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { SelectComponent } from '../../../components/select';
import { CATEGORY_TEXTS } from '../../../constants/common';
import { useDebounce } from '../../../hooks/useDebouce';
import { post, deleteMethod } from '../../../service/request';
import useAcademyStore from '../../../store/academyStore';
import useLoadingStore from '../../../store/loadingStore';

const GradesManagement = () => {
  const columns: any[] = [
    {
      field: 'maSV',
      headerName: 'Mã GV',
      width: 120,
      renderCell: (params) => (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              flex: 1,
              textDecoration: params.row.userAct ? '' : 'line-through',
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'hoTen',
      headerName: 'Họ tên',
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              flex: 1,
              textDecoration: params.row.userAct ? '' : 'line-through',
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              flex: 1,
              textDecoration: params.row.userAct ? '' : 'line-through',
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 350,
      renderCell: (params) => (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              flex: 1,
              textDecoration: params.row.userAct ? '' : 'line-through',
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'action',
      headerName: '',
      description: 'This column has a value getter and is not sortable.',
      width: 300,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              float: 'right',
              display: 'flex',
              gap: '5px',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Button
              variant='contained'
              size='small'
              onClick={() =>
                hanldeToggleActive(params.row.maSV, params.row.userAct)
              }
            >
              {params.row.userAct ? 'Deactive' : 'Active'}
            </Button>
            <Button
              variant='contained'
              size='small'
              onClick={() => handleEditData(params.row)}
            >
              <ModeEditIcon />
            </Button>
            <Button
              variant='contained'
              size='small'
              sx={{ backgroundColor: '#F56C6C' }}
              onClick={() => handleResetPassword(params.row.maSV)}
            >
              Reset <LockIcon sx={{ height: '18px', marginBottom: '4px' }} />
            </Button>
          </Box>
        );
      },
    },
  ];
  const departments = useAcademyStore((state) => state.departments);
  const [isOpenImportModal, setIsOpenImportModal] = useState<boolean>(false);
  const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false);
  const [sinhVienData, setSinhVienData] = useState<any>([]);
  const [selectedSinhVien, setSelectedSinhVien] = useState<any>();
  const [selectedKhoa, setSelectedKhoa] = useState<number>(0);
  const [selectedLopCQ, setSelectLopCQ] = useState<any>(0);
  const [lopCQData, setLopCQData] = useState<any>([]);
  const [searchSinhVien, setSearchSinhVien] = useState<string>('');
  const { setIsLoading } = useLoadingStore();
  const { mutate: mutateGetLopCQ } = useMutation({
    mutationFn: (payload: number) => {
      setIsLoading(true);
      return post({
        url: `khoa/getLop/${payload}`,
      });
    },
    onSuccess: (data) => {
      if (!data.length) {
        setIsLoading(false);
        setSinhVienData([]);
        setLopCQData([]);
        setSelectLopCQ(null);
        return;
      }

      setLopCQData(data);
      setSelectLopCQ(data[0].id);
    },
  });
  const { mutate: mutateFilterSinhVien } = useMutation({
    mutationFn: (payload: { maSV: string; lophocID: string }) => {
      setIsLoading(true);
      return post({
        url: `/lophoccq/Lớp ${payload.lophocID}`,
        // data: payload,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: (data) => {
      console.log(data);
      const mappedData = data.map((item: any) => ({ ...item, id: v4() }));
      console.log(mappedData);
      setSinhVienData(mappedData);
    },
  });
  const { mutate: mutateDeactiveSinhVien } = useMutation({
    mutationFn: (payload: string) => {
      setIsLoading(true);
      return deleteMethod({
        url: `/delete/${payload}`,
      });
    },
    onSettled: () => {
      mutateFilterSinhVien({ maSV: searchSinhVien, lophocID: selectedLopCQ });
      setIsLoading(false);
    },
  });
  const { mutate: mutateActiveSinhVien } = useMutation({
    mutationFn: (payload: string) => {
      setIsLoading(true);
      return post({
        url: `/sinhvien/updateAct/${payload}`,
      });
    },
    onSettled: () => {
      mutateFilterSinhVien({ maSV: searchSinhVien, lophocID: selectedLopCQ });
      setIsLoading(false);
    },
  });
  const { mutate: mutateImportData } = useMutation({
    mutationFn: (payload: any) => {
      setIsLoading(true);
      return post({
        url: `/sinhvien/addList`,
        data: payload,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      mutateFilterSinhVien({ maSV: searchSinhVien, lophocID: selectedLopCQ });
    },
  });
  const { mutate: mutateCreateSinhVien } = useMutation({
    mutationFn: (payload: any) => {
      payload.delete('khoaID');
      setIsLoading(true);
      return post({
        url: `/sinhvien/add/${payload.lopCQ}`,
        data: {
          ...payload,
          he: 'Kỹ sư chính quy - k2020-2025',
          truong: 'Hoc viện Kỹ thuật mật mã',
        },
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      mutateFilterSinhVien({ maSV: searchSinhVien, lophocID: selectedLopCQ });
      setIsOpenFormModal(false);
    },
  });
  const { mutate: mutateResetPassWord } = useMutation({
    mutationFn: (payload: any) => {
      setIsLoading(true);
      return post({
        url: `/sv/updatepass/${payload}`,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onError: () => {
      toast.error('Reset password failed', {
        toastId: v4(),
      });
    },
    onSuccess: () => {
      toast.success('Reset password successfully', {
        toastId: v4(),
      });
      setIsOpenFormModal(false);
    },
  });

  useEffect(() => {
    setSelectedKhoa(departments[0].id as number);
  }, [departments]);

  useEffect(() => {
    if (selectedKhoa) {
      mutateGetLopCQ(selectedKhoa);
    }
  }, [selectedKhoa]);

  useEffect(() => {
    if (selectedKhoa) {
      mutateGetLopCQ(selectedKhoa);
    }
  }, []);

  useEffect(() => {
    if (selectedKhoa && selectedLopCQ) {
      useDebounceFilterSinhVien({
        maSV: searchSinhVien,
        lophocID: selectedLopCQ,
      });
    }
  }, [selectedLopCQ, searchSinhVien]);

  const useDebounceFilterSinhVien = useDebounce(mutateFilterSinhVien);

  const handleEditData = (sinhVien: any) => {
    setIsOpenFormModal(true);
    setSelectedSinhVien(sinhVien);
  };

  const handleFileUpload = (data: File) => {
    mutateImportData(data);
  };

  const handleResetPassword = (maSV: string) => {
    mutateResetPassWord(maSV);
  };

  const hanldeToggleActive = (value: string, isActive: number) => {
    if (isActive) {
      mutateDeactiveSinhVien(value);
    } else {
      mutateActiveSinhVien(value);
    }
  };

  const handleCreateSinhVien = (data: any) => {
    return mutateCreateSinhVien(data);
  };

  const handleOpenUploadFileModal = () => {
    setIsOpenImportModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenImportModal(false);
  };

  const handleOpenFormModal = () => {
    setIsOpenFormModal(true);
  };

  const hanldeCloseFormModal = () => {
    setIsOpenFormModal(false);
  };

  return (
    <Box>
      <ImportFileModal
        onUpload={handleFileUpload}
        isShowModal={isOpenImportModal}
        onClose={handleCloseModal}
      />
      <StudentsFormModal
        onSubmit={handleCreateSinhVien}
        isShowModal={isOpenFormModal}
        value={selectedSinhVien}
        onClose={hanldeCloseFormModal}
        lopCQData={lopCQData}
        data={sinhVienData}
      />
      <Box sx={{ marginBottom: '20px' }}>
        <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>
          {CATEGORY_TEXTS.LECTURER_MANAGMENT}
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            marginBottom: 2,
          }}
        >
          <Box sx={{ width: 'fit-content', display: 'flex', gap: '10px' }}>
            <SelectComponent
              label='Khoa'
              options={departments}
              value={selectedKhoa}
              onChange={(value) => setSelectedKhoa(value)}
            />
            <SelectComponent
              label='Lớp'
              options={lopCQData}
              value={selectedLopCQ}
              onChange={(value) => setSelectLopCQ(value)}
            />
            <TextField
              size='small'
              placeholder='Search'
              onChange={(e) => setSearchSinhVien(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 1,
            }}
          >
            <Button onClick={handleOpenFormModal} variant='contained'>
              + Add
            </Button>
            <Button
              onClick={handleOpenUploadFileModal}
              variant='outlined'
              component='label'
            >
              <UploadFileOutlined /> Import
            </Button>
          </Box>
        </Box>

        <Box sx={{ minHeight: '500px', width: '100%' }}>
          {sinhVienData?.length > 0 ? (
            <DataGrid
              sx={{ minHeight: '500px' }}
              disableColumnMenu
              disableColumnFilter
              disableColumnResize
              disableColumnSorting
              rows={sinhVienData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 8,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          ) : (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #ccc',
                width: '100%',
                height: '400px',
                borderRadius: '5px',
              }}
            >
              <Typography variant='h4' sx={{ color: '#ccc' }}>
                No data
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GradesManagement;
