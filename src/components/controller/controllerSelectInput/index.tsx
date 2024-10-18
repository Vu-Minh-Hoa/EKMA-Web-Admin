/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';

export const FormInputDropdown: React.FC<any> = ({
  name,
  control,
  label,
  options,
}) => {
  const generateSingleOptions = () => {
    if (!options) return null;
    return options.map((option: any) => {
      return (
        <MenuItem key={option.id} value={option.id}>
          {option.label}
        </MenuItem>
      );
    });
  };
  return (
    <FormControl size={'small'}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
