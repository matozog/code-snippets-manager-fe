import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SnippetCardWrapper = styled(Box)(({ theme }) => ({
  height: '400px',
  [theme.breakpoints.down('sm')]: {
    height: '350px',
  },
}));
