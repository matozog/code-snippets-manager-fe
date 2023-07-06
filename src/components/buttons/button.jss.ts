import { Button, styled } from '@mui/material';

export const MuiButtonComp = styled(Button)(({ theme, variant }) => ({
  color: variant === 'contained' ? theme.palette.text.secondary : theme.palette.text.primary,
}));
