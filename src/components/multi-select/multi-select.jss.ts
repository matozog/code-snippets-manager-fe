import { FormControl, InputLabel } from '@mui/material';

import Checkbox from '@mui/material/Checkbox/Checkbox';
import { styled } from '@mui/material/styles';

export const MultiSelectFormContainer = styled(FormControl)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.primary,
}));

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
