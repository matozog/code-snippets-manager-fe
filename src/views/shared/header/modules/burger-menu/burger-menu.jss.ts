import { Box, styled } from '@mui/material';

export const BurgerMenuContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '70px',
  width: '100%',
  background: theme.palette.primary.main,
  zIndex: 900,
  '&:last-of-type': {
    marginBottom: '2px',
  },
}));

export const BurgerMenuButton = styled(Box, { shouldForwardProp: (prop) => prop !== 'isOpen' })<{ isOpen: boolean }>(
  ({ isOpen, theme }) => ({
    height: isOpen ? '50px' : '0',
    alignItems: 'center',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    transition: 'height 0.3s ease-out',
    cursor: 'pointer',
    padding: `0 ${theme.spacing(4)}`,
    '&:hover': {
      backgroundColor: theme.palette.text.secondary,
      color: theme.palette.text.primary,
    },
  })
);

export const BurgerMenuLabel = styled(Box)(({ theme }) => ({ marginLeft: theme.spacing(2) }));
