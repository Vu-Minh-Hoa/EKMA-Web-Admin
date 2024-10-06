import { Box, Typography } from '@mui/material';
import { CATEGORY_TEXTS } from '../../constants/common';

const StudentsManagement = () => {
  return (
    <Box>
      <Box sx={{ marginBottom: '30px' }}>
        <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>
          {CATEGORY_TEXTS.STUDENTS_MANAMENT}{' '}
        </Typography>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default StudentsManagement;
