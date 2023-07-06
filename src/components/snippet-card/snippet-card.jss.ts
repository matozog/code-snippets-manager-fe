import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SnippetCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  border: `1px solid ${theme.palette.primary.main}`,
  padding: theme.spacing(2),
  borderRadius: '6px',
}));

export const SnippetInfoContainer = styled(Box)(() => ({
  width: '100%',
  height: '80%',
}));

export const TagsContainer = styled(Box)(() => ({
  width: '100%',
  height: '20%',
}));
