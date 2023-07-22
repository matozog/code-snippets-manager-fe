import { Box, styled } from '@mui/material';

export const SnippetContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: `calc(50% - ${theme.spacing(4)})`,
  margin: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: `calc(100% - ${theme.spacing(4)})`,
  },
}));
