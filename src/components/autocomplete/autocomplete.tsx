import { FC, SyntheticEvent } from 'react';

import { Autocomplete } from '@mui/material';
import { StyledTextField } from '../input/input.jss';

interface IMuiAutocompleteProps {
  value: string | null;
  onChange?: (event: SyntheticEvent<Element, Event>, newValue: string | null) => void;
  onBlur?: () => void;
  options: string[];
  id?: string;
  label: string;
  error?: string;
}

const MuiAutocomplete: FC<IMuiAutocompleteProps> = ({ value, onChange, onBlur, options, id, label, error }) => {
  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      id={id}
      options={options}
      renderInput={(params) => <StyledTextField {...params} label={label} error={!!error} helperText={error} />}
    />
  );
};

export default MuiAutocomplete;
