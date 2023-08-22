import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledSearchBox = styled(TextField)(({ theme }) => ({
  width: '400px',
  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
  '& .MuiOutlinedInput-root': {
    color: theme.palette.text.secondary,
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.text.secondary,
      borderWidth: '1.5px',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.text.secondary,
    borderWidth: '0.5px',
  },
  '& .MuiInputBase-input': {
    padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
    [theme.breakpoints.down('md')]: {
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
