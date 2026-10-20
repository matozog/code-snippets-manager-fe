import { Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  justifyContent: 'space-between',
  display: 'flex',
  color: '#fff',
  height: '70px',
  width: '100%',
}));

export const StyledLogo = styled(Box)(({ theme }) => ({
  marginRight: `${theme.spacing(1)}`,
  fontSize: '20px',
  padding: `${theme.spacing(2)} ${theme.spacing(2.5)}`,
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  marginLeft: theme.spacing(1),
}));

export const SignOutIcon = styled(LogoutIcon)(() => ({
  cursor: 'pointer',
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  alignSelf: 'center',
  marginRight: theme.spacing(1),
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
