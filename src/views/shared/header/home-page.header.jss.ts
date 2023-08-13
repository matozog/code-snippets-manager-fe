import { Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  justifyContent: 'space-between',
  display: 'flex',
  color: '#fff',
  height: '70px',
  width: '100%',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const StyledLogo = styled(Box)(({ theme }) => ({
  marginRight: `${theme.spacing(1)}`,
  fontSize: '20px',
  padding: `${theme.spacing(2)} ${theme.spacing(2.5)}`,
}));

export const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  marginLeft: theme.spacing(1),
}));

export const AccountIconDetails = styled(PersonIcon)(() => ({
  cursor: 'pointer',
}));

export const NewSnippetIcon = styled(NoteAddIcon)(() => ({
  cursor: 'pointer',
}));

export const MenuActionButton = styled(Box)(({ theme }) => ({
  width: '50px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
  height: '100%',
  '&:hover': {
    backgroundColor: theme.palette.text.secondary,
    color: theme.palette.text.primary,
  },
}));

export const MenuButton = styled(MenuIcon)(() => ({
  cursor: 'pointer',
}));
