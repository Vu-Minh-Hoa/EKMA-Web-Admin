import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TablePagination,
  Box,
} from '@mui/material';

interface IExcelData {
  data: any;
}

const ExcelTable = ({ data }: IExcelData) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Set default rows per page

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // Slice data for pagination
  const paginatedData = data
    .slice(2)
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer sx={{ overflow: 'unset', borderRadius: 1 }}>
      <Table sx={{ borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            {data[0].map((header, index) => (
              <TableCell
                sx={{ border: '1px solid #f0f0f0', minWidth: 120 }}
                key={index}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {data[1].map((header, index) => (
              <TableCell
                sx={{ border: '1px solid #f0f0f0', minWidth: 120 }}
                key={index}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell
                  sx={{
                    border: '1px solid #f0f0f0', // Add border around each cell
                    textAlign: 'center',
                    minWidth: 120,
                  }}
                  key={cellIndex}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={data.length - 1} // Subtract header row from count
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ExcelTable;
