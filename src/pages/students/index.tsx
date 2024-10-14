/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadFileOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { CATEGORY_TEXTS } from '../../constants/common';
import { STUDENTS_MANAMENT_LINK } from '../../links';
import useLoadingStore from '../../store/loadingStore';
import StudentsFormModal from './FormModal';
import { get } from '../../service/request';
import ImportFileModal from './importFileModal';

const rows = [
  {
    id: v4(),
    maGV: 'GV001',
    hoTen: 'Nguyễn Văn An',
    gioiTinh: 'Nam',
    khoaName: 'Khoa Công Nghệ Thông Tin',
  },
  {
    id: v4(),
    maGV: 'GV002',
    hoTen: 'Trần Thị Bích Ngọc',
    gioiTinh: 'Nữ',
    khoaName: 'Khoa Điện Tử Viễn Thông',
  },
  {
    id: v4(),
    maGV: 'GV003',
    hoTen: 'Lê Minh Quân',
    gioiTinh: 'Nam',
    khoaName: 'Khoa An Toàn Thông Tin',
  },
  {
    id: v4(),
    maGV: 'GV004',
    hoTen: 'Phạm Thị Lan',
    gioiTinh: 'Nữ',
    khoaName: 'Khoa Công Nghệ Thông Tin',
  },
  {
    id: v4(),
    maGV: 'GV005',
    hoTen: 'Hoàng Văn Sơn',
    gioiTinh: 'Nam',
    khoaName: 'Khoa Điện Tử Viễn Thông',
  },
  {
    id: v4(),
    maGV: 'GV006',
    hoTen: 'Vũ Thị Mai',
    gioiTinh: 'Nữ',
    khoaName: 'Khoa An Toàn Thông Tin',
  },
  {
    id: v4(),
    maGV: 'GV007',
    hoTen: 'Đặng Quốc Dũng',
    gioiTinh: 'Nam',
    khoaName: 'Khoa Công Nghệ Thông Tin',
  },
  {
    id: v4(),
    maGV: 'GV008',
    hoTen: 'Bùi Thị Hạnh',
    gioiTinh: 'Nữ',
    khoaName: 'Khoa Điện Tử Viễn Thông',
  },
  {
    id: v4(),
    maGV: 'GV009',
    hoTen: 'Trịnh Văn Long',
    gioiTinh: 'Nam',
    khoaName: 'Khoa An Toàn Thông Tin',
  },
  {
    id: v4(),
    maGV: 'GV010',
    hoTen: 'Ngô Thị Thu Trang',
    gioiTinh: 'Nữ',
    khoaName: 'Khoa Công Nghệ Thông Tin',
  },
  {
    id: v4(),
    maGV: 'GV011',
    hoTen: 'Dương Quang Huy',
    gioiTinh: 'Nam',
    khoaName: 'Khoa Điện Tử Viễn Thông',
  },
  {
    id: v4(),
    maGV: 'GV012',
    hoTen: 'Phùng Thị Nhung',
    gioiTinh: 'Nữ',
    khoaName: 'Khoa An Toàn Thông Tin',
  },
  {
    id: v4(),
    maGV: 'GV013',
    hoTen: 'Nguyễn Hoàng Kiệt',
    gioiTinh: 'Nam',
    khoaName: 'Khoa Công Nghệ Thông Tin',
  },
  {
    id: v4(),
    maGV: 'GV014',
    hoTen: 'Trương Thị Mỹ Linh',
    gioiTinh: 'Nữ',
    khoaName: 'Khoa Điện Tử Viễn Thông',
  },
  {
    id: v4(),
    maGV: 'GV015',
    hoTen: 'Đỗ Minh Tú',
    gioiTinh: 'Nam',
    khoaName: 'Khoa An Toàn Thông Tin',
  },
  {
    id: v4(),
    maGV: 'GV016',
    hoTen: 'Hoàng Thị Phương',
    gioiTinh: 'Nữ',
    khoaName: 'Khoa Công Nghệ Thông Tin',
  },
  {
    id: v4(),
    maGV: 'GV017',
    hoTen: 'Võ Văn Hải',
    gioiTinh: 'Nam',
    khoaName: 'Khoa Điện Tử Viễn Thông',
  },
  {
    id: v4(),
    maGV: 'GV018',
    hoTen: 'Mai Thị Thuỷ',
    gioiTinh: 'Nữ',
    khoaName: 'Khoa An Toàn Thông Tin',
  },
  {
    id: v4(),
    maGV: 'GV019',
    hoTen: 'Lý Minh Trí',
    gioiTinh: 'Nam',
    khoaName: 'Khoa Công Nghệ Thông Tin',
  },
];

const StudentsManagement = () => {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'maGV',
      headerName: 'Mã GV',
      width: 90,
    },
    {
      field: 'hoTen',
      headerName: 'Họ tên',
      width: 150,
    },
    {
      field: 'gioiTinh',
      headerName: 'Giới tính',
      width: 100,
    },
    {
      field: 'khoaName',
      headerName: 'Tên khoa',
      description: 'This column has a value getter and is not sortable.',
      width: 450,
    },
    {
      field: 'action',
      headerName: '',
      description: 'This column has a value getter and is not sortable.',
      width: 160,
      renderCell: (params) => {
        return (
          <Box>
            <Button
              sx={{ mr: 1 }}
              variant='contained'
              size='small'
              onClick={() => handleEditData(params.id)}
            >
              <ModeEditIcon />
            </Button>
            <Button
              sx={{ backgroundColor: '#F56C6C' }}
              variant='contained'
              size='small'
              onClick={() => handleDeleteData(params.id)}
            >
              <DeleteIcon />
            </Button>
          </Box>
        );
      },
    },
  ];
  const { data } = useQuery({
    queryKey: ['getData'],
    queryFn: () => get({ url: 'giangvien' }),
  });
  const [isOpenImportModal, setIsOpenImportModal] = useState<boolean>(false);
  const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false);
  const [sinhViensData, setSinhViensData] = useState<any>(rows);
  const [selectedId, setSelectedId] = useState<any>();
  const { isLoading, setIsLoading } = useLoadingStore();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const timeoutSetLoading = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeoutSetLoading);
  }, []);

  useEffect(() => {
    console.log('useQuery: ', data);
  }, [data]);

  const handleFileUpload = (fileData: any) => {};

  const handleDeleteData = (id: GridRowId) => {
    setSelectedId(id);
  };

  const handleEditData = (id: GridRowId) => {
    navigate(`${id}`, { replace: true });
    setIsOpenFormModal(true);
    setSelectedId(id);
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
    navigate(`/${STUDENTS_MANAMENT_LINK}`, { replace: true });
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
        isShowModal={isOpenFormModal}
        onClose={hanldeCloseFormModal}
        data={sinhViensData}
      />
      <Box sx={{ marginBottom: '20px' }}>
        <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>
          {CATEGORY_TEXTS.STUDENTS_MANAMENT}
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
            <TextField size='small' placeholder='Search' />
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
          {sinhViensData.length > 0 ? (
            <DataGrid
              disableColumnMenu
              disableColumnFilter
              disableColumnResize
              disableColumnSorting
              rows={sinhViensData}
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

export default StudentsManagement;
