/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';

export const FormInputDate = ({ name, control, label = 'Date' }: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            label={label}
            value={value ? dayjs(value) : null}
            onChange={(date: any) => onChange(date ? date.toISOString() : null)}
          />
        )}
      />
    </LocalizationProvider>
  );
};
