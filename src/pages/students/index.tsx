/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Input, TextField, Typography } from '@mui/material';
import { CATEGORY_TEXTS } from '../../constants/common';
import { UploadFileOutlined } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as xlsx from 'xlsx';
import { parseExcelFile } from '../../utils/parseFile';

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
  },
  {
    field: 'age',
    headerName: 'Age',
    width: 110,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    width: 160,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Miller', firstName: 'Sarah', age: 27 },
  { id: 11, lastName: 'Davies', firstName: 'Michael', age: 34 },
  { id: 12, lastName: 'Garcia', firstName: 'Lucia', age: 22 },
  { id: 13, lastName: 'Martinez', firstName: 'Carlos', age: null },
  { id: 14, lastName: 'Lee', firstName: 'Anna', age: 19 },
  { id: 15, lastName: 'Kim', firstName: null, age: 45 },
  { id: 16, lastName: 'Brown', firstName: 'James', age: 38 },
  { id: 17, lastName: 'Wilson', firstName: 'Emily', age: 29 },
  { id: 18, lastName: 'Taylor', firstName: 'Oliver', age: 31 },
  { id: 19, lastName: 'Anderson', firstName: 'Sophia', age: 25 },
];

const StudentsManagement = () => {
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const parsedData = parseExcelFile(file);
      console.log(parsedData);
    }
  };

  return (
    <Box>
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
            <Button variant='contained'>+ Add</Button>
            <Button variant='outlined' component='label'>
              <UploadFileOutlined /> Import
              <input
                type='file'
                hidden // Hide the actual file input
                accept='.xlsx, .csv'
                onChange={handleFileUpload}
              />
            </Button>
          </Box>
        </Box>

        <Box sx={{ minHeight: '500px', width: '100%' }}>
          <DataGrid
            disableColumnMenu
            disableColumnFilter
            disableColumnResize
            disableColumnSorting
            rows={rows}
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
        </Box>
      </Box>
    </Box>
  );
};

export default StudentsManagement;
