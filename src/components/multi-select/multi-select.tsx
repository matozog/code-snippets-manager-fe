import { ListItemText, MenuItem, OutlinedInput } from '@mui/material';
import { MultiSelectFormContainer, StyledCheckbox, StyledInputLabel } from './multi-select.jss';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { FC } from 'react';

interface IMultiSelectProps {
  options: Array<string>;
  selectedOptions: Array<string>;
  onChange: (event: SelectChangeEvent<Array<string>>) => void;
  label: string;
}

const MultiSelect: FC<IMultiSelectProps> = ({ onChange, selectedOptions, options, label }) => {
  return (
    <MultiSelectFormContainer>
      <StyledInputLabel style={{ minWidth: 'max-content' }} id="demo-simple-select-helper-label">
        {label}
      </StyledInputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={selectedOptions}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(', ')}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <StyledCheckbox checked={selectedOptions.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </MultiSelectFormContainer>
  );
};

export default MultiSelect;
