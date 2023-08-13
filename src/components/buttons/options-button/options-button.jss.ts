import { Button, Menu, styled } from '@mui/material';

export const MoreInfoButton = styled(Button)(({ theme }) => ({
  height: '100%',
  width: '32px',
  padding: `${theme.spacing(1)} 0`,
  minWidth: '32px',
}));

export const StyledMenu = styled(Menu)(() => ({}));
