import { AccountIconDetails, HeaderContainer, StyledLogo } from './home-page.header.jss';
import { useMediaQuery, useTheme } from '@mui/material';

import SearchBox from 'src/components/search-box/search-box';

const HomePageHeader = () => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <HeaderContainer>
      <StyledLogo>{isMobileScreen ? 'SM' : 'Snippets Manager'}</StyledLogo>
      <SearchBox id="home-page-searchbox" placeholder="Type a word ..." />
      <AccountIconDetails />
    </HeaderContainer>
  );
};

export default HomePageHeader;
