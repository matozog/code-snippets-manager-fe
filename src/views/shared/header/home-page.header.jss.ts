import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100px',
  backgroundColor: theme.palette.primary.main,
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  color: '#fff',
}));
