import * as snippetDuck from 'src/store/reducers/snippets';

import { IRootState, useAppDispatch, useAppSelector } from 'src/store/config/store';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

import FloatingButton from 'src/components/buttons/floating-button/floating-button';
import { HomePageContainer } from './home-page.jss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MuiBackdrop from 'src/components/backdrop/mui-backdrop';
import SnippetsFilters from './modules/snippets-filters/snippets-filters';
import SnippetsList from './modules/snippets-list/snippets-list';
import { scrollToTop } from 'src/utils/utils';

const HomePage = () => {
  const [isScrollMoved, setIsScrollMoved] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLElement>();

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isLoading = useAppSelector((root: IRootState) => root.snippetsData.isLoading);

  const handleOnScroll = (event: Event) => setIsScrollMoved((event.target as HTMLElement).scrollTop !== 0);

  const handleClickScrollAnchorButton = () => {
    scrollToTop(scrollContainerRef);
  };

  useEffect(() => {
    dispatch(snippetDuck.operations.fetchSnippets());

    window.addEventListener('scroll', handleOnScroll, true);

    return () => {
      window.removeEventListener('scroll', handleOnScroll, true);
    };
  }, []);

  return (
    <>
      <HomePageContainer ref={scrollContainerRef}>
        <SnippetsFilters scrollContainerRef={scrollContainerRef} />
        <SnippetsList />
      </HomePageContainer>
      {isMobile && isScrollMoved && (
        <FloatingButton
          isVisible={isMobile && isScrollMoved}
          withFadeInAnimation
          onClick={handleClickScrollAnchorButton}
        >
          <KeyboardArrowUpIcon style={{ color: 'white' }} />
        </FloatingButton>
      )}
      <MuiBackdrop isOpen={isLoading} />
    </>
  );
};

export default HomePage;
