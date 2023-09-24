import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const QuestionModalContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const QuestionBody = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: '22px',
  fontWeight: 600,
}));

export const QuestionFooter = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  gap: theme.spacing(2),
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
}));
