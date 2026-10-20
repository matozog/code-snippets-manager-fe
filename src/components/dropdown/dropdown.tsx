import { DropdownFormContainer, StyledInputLabel } from './dropdown.jss';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { FC, useId } from 'react';

interface IDropdownProps {
  handleOnChange: (value: SelectChangeEvent<string>) => void;
  value: string;
  label: string;
  dropdownOptions: Map<string, string>;
}

const Dropdown: FC<IDropdownProps> = ({ handleOnChange, value, label, dropdownOptions }) => {
  const labelId = useId();

  return (
    <DropdownFormContainer>
      <StyledInputLabel id={labelId}>{label}</StyledInputLabel>
      <Select labelId={labelId} value={value} label={label} onChange={handleOnChange}>
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
