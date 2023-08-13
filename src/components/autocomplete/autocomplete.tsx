import { FC, SyntheticEvent } from 'react';

import { Autocomplete } from '@mui/material';
import { StyledTextField } from '../input/input.jss';

interface IMuiAutocompleteProps {
  value: string | null;
  onChange?: (event: SyntheticEvent<Element, Event>, newValue: string | null) => void;
  options: string[];
  id?: string;
  label: string;
}

const MuiAutocomplete: FC<IMuiAutocompleteProps> = ({ value, onChange, options, id, label }) => {
  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      id={id}
      options={options}
      renderInput={(params) => <StyledTextField {...params} label={label} />}
    />
  );
};

export default MuiAutocomplete;
