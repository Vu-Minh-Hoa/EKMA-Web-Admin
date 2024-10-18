/* eslint-disable react-hooks/exhaustive-deps */
import { UploadFileOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_TEXTS, CoureseGrad } from '../../constants/common';
import {
  COURSES_GRADES_MANAGEMENT_LINK,
  LECTURER_MANAGEMENT_LINK,
} from '../../links';
import { get } from '../../service/request';
import useLoadingStore from '../../store/loadingStore';
import StudentsFormModal from './FormModal';
import ImportFileModal from './importFileModal';
import { set } from 'react-hook-form';

/* eslint-disable @typescript-eslint/no-explicit-any */
const CoursesGrades = () => {
  const columns: GridColDef<(typeof CoureseGrad.data)[number]>[] = [
    {
      field: 'maSV',
      headerName: 'Mã SV',
      width: 120,
    },
    {
      field: 'hoTen',
      headerName: 'Họ tên',
      width: 250,
    },
    {
      field: 'gioiTinh',
      headerName: 'Giới tính',
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
  const [sinhViensData, setSinhViensData] = useState<any>(CoureseGrad.data);
  const [lopSelection, setLopSelection] = useState<any>(CoureseGrad.lop);
  const [selectedId, setSelectedId] = useState<any>();
  const [filter, setFilter] = useState<any>({
    course: CoureseGrad.khoa[0].id,
    class: '',
  });
  const { setIsLoading } = useLoadingStore();
  const navigate = useNavigate();

  useEffect(() => {
    handleFilterData();
  }, [filter]);

  const handleFilterData = () => {
    if (!filter.course && !filter.class) return;

    const filteredData = CoureseGrad.data.filter((item) => {
      if (filter.course && filter.class) {
        return item.khoa === filter.course && item.lop === filter.class;
      }
      if (filter.course === '') {
        return item.lop === filter.class;
      } else if (filter.class === '') {
        return item.khoa === filter.course;
      }
      return item;
    });

    const filteredLop = CoureseGrad.lop.filter((item) => {
      return filter.course === item.khoa;
    });

    setLopSelection(filteredLop);
    setSinhViensData(filteredData);
  };

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
        data={sinhViensData}
      />
      <Box sx={{ marginBottom: '20px' }}>
        <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>
          {CATEGORY_TEXTS.COURSES_GRADES}
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
            <FormControl sx={{ width: '120px', marginRight: '10px' }}>
              <InputLabel size='small' id='demo-simple-select-label'>
                Khóa
              </InputLabel>
              <Select
                size='small'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={filter.course}
                label='Age'
                onChange={(e) =>
                  setFilter({ course: e.target.value, class: '' })
                }
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
            <FormControl sx={{ width: '120px' }}>
              <InputLabel size='small' id='demo-simple-select-label'>
                Môn
              </InputLabel>
              <Select
                size='small'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={filter.class}
                label='Age'
                onChange={(e) =>
                  setFilter({ ...filter, class: e.target.value })
                }
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

export default CoursesGrades;
