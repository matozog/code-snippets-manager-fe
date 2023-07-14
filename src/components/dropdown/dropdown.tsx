import { DropdownFormContainer, StyledInputLabel } from './dropdown.jss';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { FC } from 'react';

interface IDropdownProps {
  handleOnChange: (value: SelectChangeEvent<string>) => void;
  value: string;
  label: string;
  dropdownOptions: Array<string>;
}

const Dropdown: FC<IDropdownProps> = ({ handleOnChange, value, label, dropdownOptions = [] }) => {
  return (
    <DropdownFormContainer>
      <StyledInputLabel id="demo-simple-select-helper-label">{label}</StyledInputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={value}
        label={label}
        onChange={handleOnChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {dropdownOptions?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </DropdownFormContainer>
  );
};

export default Dropdown;
