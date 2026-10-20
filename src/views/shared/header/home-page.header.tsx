import {
  ActionContainer,
  HeaderContainer,
  MenuActionButton,
  MenuButton,
  NewSnippetIcon,
  SignOutIcon,
  StyledLogo,
  UserAvatar,
} from './home-page.header.jss';
import { ChangeEvent, JSX, useMemo, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store/config/store';
import { useLocation, useNavigate } from 'react-router';

import BurgerMenu from './modules/burger-menu/burger-menu';
import SearchBox from 'src/components/search-box/search-box';
import { changeFilters } from 'src/store/reducers/filters/filters.slice';
import { signOut } from 'src/store/reducers/auth/auth.thunks';

export interface IMenuItemProps {
  label: string;
  icon: JSX.Element;
  action?: () => void;
}

const HomePageHeader = () => {
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const inputValue = useAppSelector((state) => state.snippetsFilters.keyword);
  const user = useAppSelector((state) => state.auth.user);

  const isNewSnippetPage = useMemo(() => location.pathname.includes('new-snippet'), [location]);

  const dispatch = useAppDispatch();

  const handleChangeSearchboxValue = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(changeFilters({ keyword: event.target.value }));

  const handleOnClickNewSnippetIcon = () => {
    navigate('new-snippet');
    setBurgerMenuOpen(false);
  };

  const handleOnClickSignOut = () => {
    setBurgerMenuOpen(false);
    dispatch(signOut());
  };

  const handleToggleBurgerMenu = () => setBurgerMenuOpen(!isBurgerMenuOpen);

  const handleClickOnLogo = () => navigate('/');

  const MenuItemsList: IMenuItemProps[] = [
    {
      label: 'Add new snippet',
      icon: <NewSnippetIcon />,
      action: handleOnClickNewSnippetIcon,
    },
    { label: 'Sign out', icon: <SignOutIcon />, action: handleOnClickSignOut },
  ];

  const actionsRenderer = () => {
    if (isMobileScreen) {
      return (
        <MenuActionButton onClick={handleToggleBurgerMenu} role="button" aria-label="Menu">
          <MenuButton />
        </MenuActionButton>
      );
    }

    return (
      <>
        {/*<FormControlLabel control={<MUISwitch defaultChecked />} label="" />*/}
        {user && (
          <UserAvatar
            src={user.picture}
            alt={user.name}
            title={`${user.name} (${user.email})`}
            // without a picture MUI renders the initial in a plain element, so it needs its own accessible name
            {...(!user.picture && { role: 'img', 'aria-label': user.name })}
          />
        )}
        {MenuItemsList.map((item) => (
          <MenuActionButton
            key={item.label}
            onClick={item.action}
            role="button"
            aria-label={item.label}
            title={item.label}
          >
            {item.icon}
          </MenuActionButton>
        ))}
      </>
    );
  };

  return (
    <HeaderContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <StyledLogo onClick={handleClickOnLogo}>{isMobileScreen ? 'SM' : 'Snippets Manager'}</StyledLogo>
        {!isNewSnippetPage && (
          <SearchBox
            id="home-page-searchbox"
            placeholder="Type a word ..."
            onChange={handleChangeSearchboxValue}
            value={inputValue}
          />
        )}

        <ActionContainer>{actionsRenderer()}</ActionContainer>
      </div>
      <BurgerMenu isOpen={isMobileScreen && isBurgerMenuOpen} itemsList={MenuItemsList} />
    </HeaderContainer>
  );
};

export default HomePageHeader;
