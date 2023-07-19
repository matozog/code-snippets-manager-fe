import { ChangeEvent, FC } from 'react';
import { StyledSearchBox, StyledSearchIcon } from './search-box.jss';

import { InputAdornment } from '@mui/material';

interface ISearchBoxProps {
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: FC<ISearchBoxProps> = ({ id, placeholder, value, onChange }) => {
  return (
    <StyledSearchBox
      id={id}
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <StyledSearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBox;
