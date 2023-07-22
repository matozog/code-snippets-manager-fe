import { Box, styled } from '@mui/material';

export const NewSnippetPageContainer = styled(Box)(({ theme }) => ({
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
