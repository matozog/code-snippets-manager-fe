import { Box, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';

export const SnippetCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  border: `1px solid ${theme.palette.primary.main}`,
  padding: theme.spacing(2),
  borderRadius: '6px',
  height: '200px',
  [theme.breakpoints.down('sm')]: {
    height: '250px',
  },
}));

export const SnippetInfoContainer = styled(Box)(() => ({
  width: '100%',
  height: '75%',
  display: 'flex',
}));

export const TagsContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  height: 'calc(25% - 24px)',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const SnippetImageContainer = styled(Box)(() => ({
  width: '120px',
  float: 'left',
}));

export const SnippetDescription = styled(Box)(() => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

export const SnippetTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: '24px',
}));

export const SnippetContent = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  textAlign: 'justify',
}));

export const SnippetContentOverflow = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  background: 'linear-gradient(transparent 20%,#FFF 75%)',
}));
