import { Box, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';

export const SnippetCardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  height: `calc(100% - ${theme.spacing(3)})`,
}));

export const SnippetInfoContainer = styled(Box)(() => ({
  width: '100%',
  height: '75%',
  display: 'flex',
  flexDirection: 'column',
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
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

export const SnippetTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    fontSize: '22px',
  },
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
  zIndex: 1300,
}));

export const SnippetCode = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  overflow: 'hidden',
  position: 'relative',
}));

export const TagsChipContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOverflow',
})<{ isOverflow?: boolean }>(({ theme, isOverflow }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  width: isOverflow ? '80%' : '100%',
  overflowX: 'auto',
}));

export const SnippetProperties = styled(Box)(() => ({ display: 'flex' }));

export const SnippetDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  margin: `${theme.spacing(1)} 0`,
  gap: theme.spacing(2),
  flexWrap: 'wrap',
}));

export const SnippetDetail = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

export const SnippetDetailLabel = styled(Box)(() => ({ fontSize: '18px', fontWeight: 500 }));

export const SnippetDetailValue = styled(Box)(() => ({}));
