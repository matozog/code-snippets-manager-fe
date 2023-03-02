import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SnippetsListContainer = styled(Box)(({ theme }) => ({
  width: `calc(100% - ${theme.spacing(8)})`,
  height: '75%',
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: '5px',
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    width: '75%',
    height: '100%',
  },
}));
