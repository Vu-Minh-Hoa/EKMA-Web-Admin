/* eslint-disable react-hooks/exhaustive-deps */
import { UploadFileOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_TEXTS, CoureseGrad } from '../../constants/common';
import { COURSES_GRADES_MANAGEMENT_LINK } from '../../links';
import useLoadingStore from '../../store/loadingStore';
import StudentsFormModal from './FormModal';
import ImportFileModal from './importFileModal';

const rows = [
  {
    id: 1,
    tenLop: 'Lớp 10A1',
  },
  {
    id: 2,
    tenLop: 'Lớp 10A2',
  },
  {
    id: 3,
    tenLop: 'Lớp 10B1',
  },
  {
    id: 4,
    tenLop: 'Lớp 11A1',
  },
  {
    id: 5,
    tenLop: 'Lớp 11A2',
  },
  {
    id: 6,
    tenLop: 'Lớp 11B1',
  },
  {
    id: 7,
    tenLop: 'Lớp 12A1',
  },
  {
    id: 8,
    tenLop: 'Lớp 12A2',
  },
  {
    id: 9,
    tenLop: 'Lớp 12B1',
  },
  {
    id: 10,
    tenLop: 'Lớp 12B2',
  },
];
/* eslint-disable @typescript-eslint/no-explicit-any */
const CourseSchedule = () => {
  const columns: any = [
    {
      field: 'tenLop',
      headerName: 'Tên lớp',
      width: 120,
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
  const [isOpenImportModal, setIsOpenImportModal] = useState<boolean>(false);
  const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false);
  const [schedulesData, setSchedulesData] = useState<any>(rows);
  const [lopSelection, setLopSelection] = useState<any>(CoureseGrad.lop);
  const [selectedId, setSelectedId] = useState<any>();
  const [filter, setFilter] = useState<any>({
    course: CoureseGrad.khoa[0].id,
    class: '',
  });
  const { setIsLoading } = useLoadingStore();
  const navigate = useNavigate();

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
    navigate(`/${COURSES_GRADES_MANAGEMENT_LINK}`, { replace: true });
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
        data={schedulesData}
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
            {/* <SelectComponent
              label='Khoa'
              options={departments}
              value={selectedKhoa}
              onChange={(value) => setSelectedKhoa(value)}
            />
            <SelectComponent
              label='Khoa'
              options={departments}
              value={selectedKhoa}
              onChange={(value) => setSelectedKhoa(value)}
            />
            <SelectComponent
              label='Khoa'
              options={departments}
              value={selectedKhoa}
              onChange={(value) => setSelectedKhoa(value)}
            /> */}
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
          {schedulesData.length > 0 ? (
            <DataGrid
              disableColumnMenu
              disableColumnFilter
              disableColumnResize
              disableColumnSorting
              rows={schedulesData}
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

export default CourseSchedule;
