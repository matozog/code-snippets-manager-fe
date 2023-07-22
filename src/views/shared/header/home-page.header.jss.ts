import { Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
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

export const StyledLogo = styled(Box)(({ theme }) => ({
  marginRight: `${theme.spacing(1)}`,
  fontSize: '20px',
}));

export const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginLeft: theme.spacing(1),
}));

export const AccountIconDetails = styled(PersonIcon)(() => ({
  cursor: 'pointer',
}));

export const NewSnippetIcon = styled(NoteAddIcon)(() => ({
  cursor: 'pointer',
}));

export const MenuButton = styled(MenuIcon)(() => ({
  cursor: 'pointer',
}));
