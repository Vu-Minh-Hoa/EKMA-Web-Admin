/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadFileOutlined } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, Button, TextField, Typography } from '@mui/material';
import GradesModal from './FormModal';
import ImportFileModal from '../importGradesFileModal';
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
import { useParams } from 'react-router-dom';

const GradesManagement = () => {
  const columns: any[] = [
    {
      field: 'maSV',
      headerName: 'Mã GV',
      width: 120,
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
              onClick={() => handleEditData(params.row)}
            >
              <ModeEditIcon />
            </Button>
          </Box>
        );
      },
    },
  ];
  const { id: maSV } = useParams();
  const [gradesData, setGradesData] = useState<any>([]);
  const [selectedGrade, setSelectedGrade] = useState<any>();
  const [searchGrade, setSearchGrade] = useState<string>('');
  const { setIsLoading } = useLoadingStore();
  const { mutate: mutateFilterGrade } = useMutation({
    mutationFn: () => {
      setIsLoading(true);
      return post({
        url: `sv/getAllDiem/${maSV}`,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: (data) => {
      const mappedData = data.map((item: any) => ({ ...item, id: v4() }));
      setGradesData(mappedData);
    },
  });
  const { mutate: mutateCreateGrade } = useMutation({
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
      mutateFilterGrade();
    },
  });

  useEffect(() => {
    useDebounceFilterGrade({
      maSV: searchGrade,
    });
  }, [searchGrade]);

  const useDebounceFilterGrade = useDebounce(mutateFilterGrade);

  const handleEditData = (sinhVien: any) => {
    setSelectedGrade(sinhVien);
  };

  const handleCreateGrade = (data: any) => {
    return mutateCreateGrade(data);
  };

  return (
    <Box>
      <Box sx={{ marginBottom: '20px' }}>
        <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>
          {CATEGORY_TEXTS.GRADES_MANAGEMENT}
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
            <TextField
              size='small'
              placeholder='Search'
              onChange={(e) => setSearchGrade(e.target.value)}
            />
          </Box>
        </Box>

        <Box sx={{ minHeight: '500px', width: '100%' }}>
          {gradesData?.length > 0 ? (
            <DataGrid
              sx={{ minHeight: '500px' }}
              disableColumnMenu
              disableColumnFilter
              disableColumnResize
              disableColumnSorting
              rows={gradesData}
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
