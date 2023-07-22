import * as filtersDuck from 'src/store/reducers/filters';

import {
  AccountIconDetails,
  ActionContainer,
  HeaderContainer,
  MenuButton,
  NewSnippetIcon,
  StyledLogo,
} from './home-page.header.jss';
import { IRootState, useAppDispatch } from 'src/store/config/store';
import { useMediaQuery, useTheme } from '@mui/material';

import { ChangeEvent } from 'react';
import SearchBox from 'src/components/search-box/search-box';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomePageHeader = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const inputValue = useSelector((root: IRootState) => root.snippetsFilters.keyword);

  const dispatch = useAppDispatch();

  const handleChangeSearchboxValue = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(filtersDuck.operations.changeFiltersField('keyword', event.target.value));

  const handleOnClickNewSnippetIcon = () => {
    navigate('new-snippet');
  };

  return (
    <HeaderContainer>
      <StyledLogo>{isMobileScreen ? 'SM' : 'Snippets Manager'}</StyledLogo>
      <SearchBox
        id="home-page-searchbox"
        placeholder="Type a word ..."
        onChange={handleChangeSearchboxValue}
        value={inputValue}
      />
      <ActionContainer>
        {isMobileScreen ? (
          <MenuButton />
        ) : (
          <>
            <NewSnippetIcon onClick={handleOnClickNewSnippetIcon} />
            <AccountIconDetails />
          </>
        )}
      </ActionContainer>
    </HeaderContainer>
  );
};

export default HomePageHeader;
