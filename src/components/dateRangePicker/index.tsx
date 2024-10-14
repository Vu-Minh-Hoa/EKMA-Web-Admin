/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import { FORMAT_DATE } from '../../constants/common';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function DateRangePicker({ onChange }: any) {
  const [dateRangeData, setDateRangeData] = useState({
    fromDate: moment().format(FORMAT_DATE.DATE_DEFAULT),
    endDate: moment().add(1, 'days').format(FORMAT_DATE.DATE_DEFAULT),
  });

  useEffect(() => {
    if (dateRangeData.fromDate && dateRangeData.endDate)
      onChange && onChange(dateRangeData);
  }, [dateRangeData]);

  const handleOnChange = (name: string, value: any) => {
    if (!value) return;

    if (name === 'fromDate') {
      setDateRangeData((prev) => ({ ...prev, fromDate: value }));
    } else {
      setDateRangeData((prev) => ({ ...prev, endDate: value }));
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format='DD/MM/YYYY'
          label='Start Date'
          value={dateRangeData.fromDate ? dayjs(dateRangeData.fromDate) : null}
          onChange={(date: any) =>
            handleOnChange('fromDate', date ? date.toISOString() : null)
          }
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          format='DD/MM/YYYY'
          label='End Date'
          value={dateRangeData.endDate ? dayjs(dateRangeData.endDate) : null}
          onChange={(date: any) =>
            handleOnChange('endDate', date ? date.toISOString() : null)
          }
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
}
