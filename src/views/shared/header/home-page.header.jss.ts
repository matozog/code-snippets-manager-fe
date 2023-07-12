import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  width: `calc(100% - ${theme.spacing(5)})`,
  backgroundColor: theme.palette.primary.main,
  padding: `${theme.spacing(2)} ${theme.spacing(2.5)}`,
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex',
  color: '#fff',
  height: '38px',
}));

export const AccountIconDetails = styled(PersonIcon)(({ theme }) => ({
  cursor: 'pointer',
  marginLeft: `${theme.spacing(1)}`,
}));

export const StyledLogo = styled(Box)(({ theme }) => ({
  marginRight: `${theme.spacing(1)}`,
  fontSize: '20px',
}));
