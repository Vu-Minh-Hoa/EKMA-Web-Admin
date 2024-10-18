/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { IOption } from '../../types/interface';

interface SelectProps {
  label: string;
  value?: string | number;
  options: IOption[];
  onChange?: (value: number) => void;
}

export const SelectComponent = ({
  label,
  options,
  onChange,
  value = undefined,
}: SelectProps) => {
  const handleOnChange = (e: any) => {
    onChange && onChange(e.target.value);
  };

  return (
    <FormControl sx={{ minWidth: '100px' }} size={'small'}>
      <InputLabel
        sx={{ backgroundColor: '#fff', paddingX: '5px', marginLeft: '-5px' }}
        size='small'
      >
        {label}
      </InputLabel>
      <Select
        size='small'
        onChange={handleOnChange}
        defaultValue={value}
        value={value}
      >
        {options.map((option: any) => {
          return (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
