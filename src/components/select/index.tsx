/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { IOption } from '../../types/interface';

interface SelectProps {
  label: string;
  value?: string | null;
  options: IOption[];
  onChange?: (value: string) => void;
}

export const SelectComponent = ({
  label,
  options,
  onChange,
  value = null,
}: SelectProps) => {
  const handleOnChange = (e: any) => {
    onChange && onChange(e.target.value);
  };

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
    <FormControl sx={{ minWidth: '100px' }} size={'small'}>
      <InputLabel size='small'>{label}</InputLabel>
      <Select size='small' onChange={handleOnChange} value={value}>
        {generateSingleOptions()}
      </Select>
    </FormControl>
  );
};
