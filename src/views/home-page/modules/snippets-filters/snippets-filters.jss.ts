import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SnippetsFiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: `calc(100% - ${theme.spacing(8)})`,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: '6px',
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    width: '25%',
    maxHeight: `calc(100% - ${theme.spacing(8)})`,
    marginBottom: 'auto',
  },
  // [theme.breakpoints.up('sm')]: {
  //   height: '25%',
  // },
}));
