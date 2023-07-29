import { Box, styled } from '@mui/material';

export const ModalDialogContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.common.white,
  border: '2px solid #000',
  p: 4,
}));
