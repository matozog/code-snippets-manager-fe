import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  maxHeight: '90%',
  transform: 'translate(-50%, -50%)',
  overflow: 'hidden',
  backgroundColor: theme.palette.common.white,
  p: 4,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
