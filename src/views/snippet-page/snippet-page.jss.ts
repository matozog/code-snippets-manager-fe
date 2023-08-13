import { Box, styled } from '@mui/material';

export const NewSnippetPageWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'calc(100% - 86px)', // header height
  [theme.breakpoints.down('md')]: {
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));

export const NewSnippetPageContainer = styled(Box)(({ theme }) => ({
  height: `calc(100% - ${theme.spacing(5)})`,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

export const NewSnippetPageActions = styled(Box)(({ theme }) => ({
  height: '40px',
  margin: `${theme.spacing(2)} ${theme.spacing(2)} 0 ${theme.spacing(2)}`,
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));
