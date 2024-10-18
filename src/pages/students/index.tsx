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
import { CATEGORY_TEXTS } from '../../constants/common';
import { STUDENTS_MANAMENT_LINK } from '../../links';
import { post } from '../../service/request';
import useAcademyStore from '../../store/academyStore';
import useLoadingStore from '../../store/loadingStore';
import StudentsFormModal from './FormModal';
import ImportFileModal from './importFileModal';
import { SelectComponent } from '../../components/select';

const LecturersManagement = () => {
  const columns: GridColDef[] = [
    { field: 'maSV', headerName: 'Mã SV', width: 120 },
    { field: 'hoTen', headerName: 'Họ tên', width: 250 },
    { field: 'gioiTinh', headerName: 'Giới tính', width: 650 },
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
  const departments = useAcademyStore((state) => state.departments);
  const [isOpenImportModal, setIsOpenImportModal] = useState<boolean>(false);
  const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false);
  const [giangVienData, setGiangVienData] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<any>();
  const [selectedKhoa, setSelectedKhoa] = useState<string>(departments[0]?.id);
  const { isLoading, setIsLoading } = useLoadingStore();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['getData'],
    queryFn: () => post({ url: 'giangvien' }),
  });

  useEffect(() => {
    console.log('useQuery: ', data);
  }, [data]);

  const handleDeleteData = (id: GridRowId) => {
    setSelectedId(id);
  };

  const handleEditData = (id: GridRowId) => {
    navigate(`${id}`, { replace: true });
    setIsOpenFormModal(true);
    setSelectedId(id);
  };

  const handleFileUpload = (data: File) => {
    console.log(data);
  };

  const hanldeSelectKhoa = (value: string) => {
    setSelectedKhoa(value);
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
        data={giangVienData}
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
            <TextField
              sx={{ marginRight: '10px' }}
              size='small'
              placeholder='Search'
            />
            <SelectComponent
              label='Khoa'
              options={departments}
              value={selectedKhoa || null}
              onChange={hanldeSelectKhoa}
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
          {giangVienData.length > 0 ? (
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
