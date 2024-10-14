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
import { get } from '../../service/request';
import ImportFileModal from './importFileModal';
import StudentsFormModal from './FormModal';
import DateRangePicker from '../../components/dateRangePicker';

const CoursesSchedules = () => {
  const columns: GridColDef<any[number]>[] = [
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
    queryKey: ['coursesSchedules'],
    queryFn: () => get({ url: 'lichhoc' }),
  });
  const [isOpenImportModal, setIsOpenImportModal] = useState<boolean>(false);
  const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false);
  const [sinhViensData, setSinhViensData] = useState<any>([]);
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

  const handleOnChangeDate = (value: any) => {
    console.log(value);
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
          {CATEGORY_TEXTS.COURSES_SCHEDULES}
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
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 1,
            }}
          >
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
          {data?.length > 0 ? (
            <DataGrid
              disableColumnMenu
              disableColumnFilter
              disableColumnResize
              disableColumnSorting
              rows={data}
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

export default CoursesSchedules;
