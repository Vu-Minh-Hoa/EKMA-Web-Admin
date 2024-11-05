/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { CATEGORY_TEXTS } from '../../../constants/common';
import { useDebounce } from '../../../hooks/useDebouce';
import { deleteMethod, post } from '../../../service/request';
import useLoadingStore from '../../../store/loadingStore';
import GradesFormModal from './FormModal';
import { DeleteOutline } from '@mui/icons-material';

const GradesManagement = () => {
  const columns: any[] = [
    {
      field: 'monHoc',
      headerName: 'Môn học',
      width: 300,
    },
    {
      field: 'diemTP1',
      headerName: 'Điểm TP1',
      width: 120,
    },
    {
      field: 'diemTP2',
      headerName: 'Điểm TP2',
      width: 120,
    },
    {
      field: 'diemTK',
      headerName: 'Điểm TK',
      width: 120,
    },
    {
      field: 'diemChu',
      headerName: 'Điểm chữ',
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
            <Button
              variant='contained'
              size='small'
              sx={{ backgroundColor: '#F56C6C' }}
              onClick={() => handleDeleteData(params.row.id)}
            >
              <DeleteOutline />
            </Button>
          </Box>
        );
      },
    },
  ];
  const { id: maSV } = useParams();
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [gradesData, setGradesData] = useState<any[]>([]);
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
      setGradesData(data);
    },
  });
  const { mutate: mutateEditGrade } = useMutation({
    mutationFn: (payload: any) => {
      setIsLoading(true);
      return post({
        url: `diem/updateSV`,
        data: {
          maSV,
          monhocID: selectedGrade?.id,
          ...payload,
        },
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsOpenEditModal(false);
      mutateFilterGrade();
    },
  });
  const { mutate: mutateDeleteGrade } = useMutation({
    mutationFn: (payload: any) => {
      console.log(payload);
      setIsLoading(true);
      return post({
        url: `diem/delete`,
        data: payload,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsOpenEditModal(false);
      mutateFilterGrade();
    },
  });

  useEffect(() => {
    useDebounceFilterGrade({
      maSV: searchGrade,
    });
  }, [searchGrade]);

  const useDebounceFilterGrade = useDebounce(mutateFilterGrade);

  const handleEditData = (grade: any) => {
    setSelectedGrade(grade);
    setIsOpenEditModal(true);
  };

  const handleDeleteData = (monhocId: string) => {
    mutateDeleteGrade({
      maSV: maSV,
      monhocId,
    });
  };

  const handleEditPoint = (data: any) => {
    mutateEditGrade(data);
  };

  const handleCloseModal = () => {
    setIsOpenEditModal(false);
    setSelectedGrade(undefined);
  };

  return (
    <>
      <GradesFormModal
        onSubmit={handleEditPoint}
        value={selectedGrade}
        isShowModal={isOpenEditModal}
        onClose={handleCloseModal}
      />
      <Box>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>
            {CATEGORY_TEXTS.GRADES_MANAGEMENT}
          </Typography>
        </Box>
        <Box>
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
    </>
  );
};

export default GradesManagement;
