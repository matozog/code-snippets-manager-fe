import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SnippetsListContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  width: `calc(100% - ${theme.spacing(4)})`,
  padding: `0 ${theme.spacing(2)} 0 ${theme.spacing(2)}`,
  margin: `${theme.spacing(2)} 0 ${theme.spacing(2)} 0`,
  [theme.breakpoints.up('md')]: {
    width: '75%',
    height: `calc(100% - ${theme.spacing(4)})`,
    overflowY: 'auto',
  },
}));
