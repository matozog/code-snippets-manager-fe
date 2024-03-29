import { DropdownFormContainer, StyledInputLabel } from './dropdown.jss';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { FC } from 'react';

interface IDropdownProps {
  handleOnChange: (value: SelectChangeEvent<string>) => void;
  value: string;
  label: string;
  dropdownOptions: Map<string, string>;
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
        {Array.from(dropdownOptions).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </DropdownFormContainer>
  );
};

export default Dropdown;
