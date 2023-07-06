import { StyledSearchBox, StyledSearchIcon } from './search-box.jss';

import { FC } from 'react';
import { InputAdornment } from '@mui/material';

interface ISearchBoxProps {
  id: string;
  placeholder?: string;
}

const SearchBox: FC<ISearchBoxProps> = ({ id, placeholder }) => {
  return (
    <StyledSearchBox
      id={id}
      variant="outlined"
      placeholder={placeholder}
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
