/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadFileOutlined } from '@mui/icons-material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectComponent } from '../../components/select';
import { CATEGORY_TEXTS } from '../../constants/common';
import { useDebounce } from '../../hooks/useDebouce';
import { deleteMethod, post } from '../../service/request';
import useAcademyStore from '../../store/academyStore';
import useLoadingStore from '../../store/loadingStore';
import StudentsFormModal from './FormModal';
import ImportFileModal from './importFileModal';

const LecturersManagement = () => {
  const columns: any[] = [
    {
      field: 'maGV',
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
      field: 'gioiTinh',
      headerName: 'Giới tính',
      width: 100,
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
      field: 'khoaName',
      headerName: 'Khoa',
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
          <Box sx={{ float: 'right' }}>
            <Button
              sx={{ mr: 1 }}
              variant='contained'
              size='small'
              onClick={() =>
                hanldeToggleActive(params.row.maGV, params.row.userAct)
              }
            >
              {params.row.userAct ? 'Deactive' : 'Active'}
            </Button>
            <Button
              sx={{ mr: 1 }}
              variant='contained'
              size='small'
              onClick={() => handleEditData(params.row)}
            >
              <ModeEditIcon />
            </Button>
          </Box>
        );
      },
    },
  ];
  const departments = useAcademyStore((state) => state.departments);
  const [isOpenImportModal, setIsOpenImportModal] = useState<boolean>(false);
  const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false);
  const [giangVienData, setGiangVienData] = useState<any>([]);
  const [selectedLecturer, setSelectedLecturer] = useState<any>();
  const [selectedKhoa, setSelectedKhoa] = useState<number>(0);
  const [searchGiangVien, setSearchGiangVien] = useState<string>('');
  const { isLoading, setIsLoading } = useLoadingStore();
  const { mutate: mutateFilterGiangVien } = useMutation({
    mutationFn: (payload: { maGV: string; khoaID: number }) => {
      setIsLoading(true);
      return post({
        url: '/giangvien/search',
        data: payload,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: (data) => {
      setGiangVienData(data);
    },
  });
  const { mutate: mutateDeactiveGiangVien } = useMutation({
    mutationFn: (payload: string) => {
      setIsLoading(true);
      return deleteMethod({
        url: `/giangvien/delete/${payload}`,
      });
    },
    onSettled: () => {
      setIsLoading(false);
      mutateFilterGiangVien({ maGV: searchGiangVien, khoaID: selectedKhoa });
    },
  });
  const { mutate: mutateActiveGiangVien } = useMutation({
    mutationFn: (payload: string) => {
      setIsLoading(true);
      return post({
        url: `/giangvien/updateAct/${payload}`,
      });
    },
    onSettled: () => {
      setIsLoading(false);
      mutateFilterGiangVien({ maGV: searchGiangVien, khoaID: selectedKhoa });
    },
  });
  const { mutate: mutateImportData } = useMutation({
    mutationFn: (payload: any) => {
      console.log(payload);
      setIsLoading(true);
      return post({
        url: `/giangvien/addList`,
        data: payload,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      mutateFilterGiangVien({ maGV: searchGiangVien, khoaID: selectedKhoa });
    },
  });
  const { mutate: mutateCreateGiangVien } = useMutation({
    mutationFn: (payload: any) => {
      setIsLoading(true);
      return post({
        url: `/giangvien/add`,
        data: payload,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      mutateFilterGiangVien({ maGV: searchGiangVien, khoaID: selectedKhoa });
      setIsOpenFormModal(false);
    },
  });
  const { mutate: mutateEditGiangVien } = useMutation({
    mutationFn: (payload: any) => {
      setIsLoading(true);
      const departmentName = departments.find(
        (item) => item.id === payload.khoaID,
      )?.label;
      payload.khoaName = departmentName;
      return post({
        url: `/giangvien/update`,
        data: payload,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      mutateFilterGiangVien({ maGV: searchGiangVien, khoaID: selectedKhoa });
      setSelectedLecturer(null);
      setIsOpenFormModal(false);
    },
  });

  useEffect(() => {
    setSelectedKhoa(departments[0].id as number);
  }, [departments]);

  useEffect(() => {
    if (selectedKhoa) {
      useDebounceFilterGiangVien({
        maGV: searchGiangVien,
        khoaID: selectedKhoa,
      });
    }
  }, [selectedKhoa, searchGiangVien]);

  const useDebounceFilterGiangVien = useDebounce(mutateFilterGiangVien);

  const handleEditData = (lecturer) => {
    setIsOpenFormModal(true);
    setSelectedLecturer(lecturer);
  };

  const handleFileUpload = (data: File) => {
    mutateImportData(data);
  };

  const hanldeToggleActive = (value: string, isActive: number) => {
    if (isActive) {
      mutateDeactiveGiangVien(value);
    } else {
      mutateActiveGiangVien(value);
    }
  };

  const handleCreateUpdateGiangVien = (data: any) => {
    if (selectedLecturer) {
      return mutateEditGiangVien(data);
    }
    return mutateCreateGiangVien(data);
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
    setSelectedLecturer(null);
  };

  return (
    <Box>
      <ImportFileModal
        onUpload={handleFileUpload}
        isShowModal={isOpenImportModal}
        onClose={handleCloseModal}
      />
      <StudentsFormModal
        value={selectedLecturer}
        onSubmit={handleCreateUpdateGiangVien}
        isShowModal={isOpenFormModal}
        onClose={hanldeCloseFormModal}
        data={giangVienData}
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
          <Box sx={{ width: 'fit-content' }}>
            <SelectComponent
              label='Khoa'
              options={departments}
              value={selectedKhoa}
              onChange={(value) => setSelectedKhoa(value)}
            />
            <TextField
              sx={{ marginLeft: '10px' }}
              size='small'
              placeholder='Search'
              onChange={(e) => setSearchGiangVien(e.target.value)}
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
          {giangVienData?.length > 0 ? (
            <DataGrid
              disableColumnMenu
              disableColumnFilter
              disableColumnResize
              disableColumnSorting
              rows={giangVienData}
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

export default LecturersManagement;
