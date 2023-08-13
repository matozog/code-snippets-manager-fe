import { Box, Button, styled } from '@mui/material';

export const MuiButtonComp = styled(Button)(({ theme, variant }) => ({
  textTransform: 'none',
  color: variant === 'contained' ? theme.palette.text.secondary : theme.palette.text.primary,
  ':hover': {
    backgroundColor: variant === 'contained' ? theme.palette.text.primary : theme.palette.common.white,
  },
}));

export const ButtonContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));
