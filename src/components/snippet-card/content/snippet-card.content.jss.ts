import { Box, Typography } from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

export const SnippetCardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  height: `calc(100% - ${theme.spacing(3)})`,
}));

export const SnippetInfoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(1),
  },
}));

export const TagsContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  maxHeight: 'calc(20% - 24px)',
}));

export const SnippetImageContainer = styled(Box)(() => ({
  width: '120px',
  float: 'left',
}));

export const SnippetDescription = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isImage',
})<{ isImage?: boolean }>(({ theme, isImage }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up(400)]: {
    width: isImage ? 'calc(100% - 120px)' : '100%',
  },
}));

export const SnippetTitleContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const EditIconButton = styled(EditIcon)(() => ({
  height: '100%',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const SnippetActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

export const CopySnippetButton = styled(ContentCopyIcon)(() => ({
  height: '100%',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const SnippetTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
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
  height: 'calc(100% - 100px)',
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
  flexWrap: 'wrap',
}));

export const SnippetProperties = styled(Box)(() => ({ display: 'flex', height: '100px' }));

export const SnippetDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  margin: `${theme.spacing(1)} 0`,
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  overflowY: 'auto',
}));

export const SnippetDetail = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

export const SnippetDetailLabel = styled(Box)(() => ({ fontSize: '18px', fontWeight: 500 }));

export const SnippetDetailValue = styled(Box)(() => ({}));
