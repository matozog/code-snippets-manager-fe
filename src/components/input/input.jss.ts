import { TextField, styled } from '@mui/material';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.primary,
  '& .MuiFormLabel-root': {
    color: theme.palette.text.primary,
  },
}));
