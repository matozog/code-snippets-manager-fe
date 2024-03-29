import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HomePageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'calc(100% - 70px)', // header height
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
  [theme.breakpoints.down('md')]: {
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));
