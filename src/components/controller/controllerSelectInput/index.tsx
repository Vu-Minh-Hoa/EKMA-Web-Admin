/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';

export const FormInputDropdown: React.FC<any> = ({
  name,
  control,
  label,
  options,
  sx,
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
    <FormControl sx={{ width: '100%', ...sx }} size={'small'}>
      <InputLabel
        size='small'
        sx={{ backgroundColor: '#fff', paddingX: '5px', marginLeft: '-5px' }}
      >
        {label}
      </InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select size='small' onChange={onChange} value={value}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
