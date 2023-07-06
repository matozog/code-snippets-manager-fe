import { DatePicker } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';

export const CustomDatepicker = styled(DatePicker)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.primary,

  '& .MuiFormLabel-root': {
    color: theme.palette.text.primary,
  },
}));
