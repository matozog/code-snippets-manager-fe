import { Box, styled } from '@mui/material';

export const SnippetAttributesWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '50%',
  marginBottom: 'auto',
  margin: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: `calc(100% - ${theme.spacing(4)})`,
  },
}));

export const SnippetAttributesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: theme.spacing(2),
  width: '100%',
  gap: theme.spacing(2),
}));

export const SnippetTags = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: theme.spacing(2),
  gap: theme.spacing(2),
}));

export const NewTagControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
}));

export const NewSnippetTagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexFlow: 'wrap',
}));
