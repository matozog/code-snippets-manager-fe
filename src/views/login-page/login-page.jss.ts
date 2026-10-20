import { Box, Typography, styled } from '@mui/material';

export const LoginPageContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
}));

export const LoginCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  maxWidth: 400,
  width: '100%',
  padding: theme.spacing(4),
  textAlign: 'center',
}));

export const LoginTitle = styled(Typography)(() => ({
  fontSize: '28px',
  fontWeight: 500,
}));
