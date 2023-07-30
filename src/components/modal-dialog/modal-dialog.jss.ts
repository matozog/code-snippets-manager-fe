import { Box, styled } from '@mui/material';

export const ModalDialogContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxHeight: '90%',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    width: '70%',
  },
  backgroundColor: theme.palette.common.white,
  border: '2px solid #000',
  p: 4,
}));
