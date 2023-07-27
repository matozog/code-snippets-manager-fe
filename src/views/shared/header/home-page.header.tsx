import * as filtersDuck from 'src/store/reducers/filters';

import {
  AccountIconDetails,
  ActionContainer,
  HeaderContainer,
  MenuActionButton,
  MenuButton,
  NewSnippetIcon,
  StyledLogo,
} from './home-page.header.jss';
import { ChangeEvent, useMemo, useState } from 'react';
import { IRootState, useAppDispatch } from 'src/store/config/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';

import BurgerMenu from './modules/burger-menu/burger-menu';
import SearchBox from 'src/components/search-box/search-box';
import { useSelector } from 'react-redux';

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
  const inputValue = useSelector((root: IRootState) => root.snippetsFilters.keyword);

  const isNewSnippetPage = useMemo(() => location.pathname.includes('new-snippet'), [location]);

  const dispatch = useAppDispatch();

  const handleChangeSearchboxValue = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(filtersDuck.operations.changeFiltersField('keyword', event.target.value));

  const handleOnClickNewSnippetIcon = () => {
    navigate('new-snippet');
    setBurgerMenuOpen(false);
  };

  const handleOnClickAccountButton = () => {
    setBurgerMenuOpen(false);
  };

  const handleToggleBurgerMenu = () => setBurgerMenuOpen(!isBurgerMenuOpen);

  const handleClickOnLogo = () => navigate('/');

  const MenuItemsList: IMenuItemProps[] = [
    {
      label: 'Add new snippet',
      icon: <NewSnippetIcon />,
      action: handleOnClickNewSnippetIcon,
    },
    { label: 'Account', icon: <AccountIconDetails />, action: handleOnClickAccountButton },
  ];

  const actionsRenderer = () => {
    if (isMobileScreen) {
      return (
        <MenuActionButton onClick={handleToggleBurgerMenu}>
          <MenuButton />
        </MenuActionButton>
      );
    }

    return (
      <>
        {MenuItemsList.map((item) => (
          <MenuActionButton key={item.label} onClick={item.action}>
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
