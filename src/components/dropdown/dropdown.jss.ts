import { FormControl, InputLabel } from '@mui/material';

import { styled } from '@mui/material/styles';

export const DropdownFormContainer = styled(FormControl)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.primary,
}));

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
