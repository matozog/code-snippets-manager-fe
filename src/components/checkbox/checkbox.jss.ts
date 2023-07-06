import { Box, Checkbox } from '@mui/material';

import { styled } from '@mui/material/styles';

export const MuiCheckboxContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const MuiCheckboxComp = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const CheckboxLabel = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
}));
