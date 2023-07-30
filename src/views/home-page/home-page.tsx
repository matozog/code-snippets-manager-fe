import * as snippetDuck from 'src/store/reducers/snippets';

import { IRootState, useAppDispatch, useAppSelector } from 'src/store/config/store';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

import FloatingButton from 'src/components/buttons/floating-button/floating-button';
import { HomePageContainer } from './home-page.jss';
import { ICodeSnippet } from 'src/types/models';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ModalDialog from 'src/components/modal-dialog/modal-dialog';
import MuiBackdrop from 'src/components/backdrop/mui-backdrop';
import SnippetCardContent from 'src/components/snippet-card/content/snippet-card.content';
import SnippetsFilters from './modules/snippets-filters/snippets-filters';
import SnippetsList from './modules/snippets-list/snippets-list';
import { scrollToTop } from 'src/utils/utils';

const HomePage = () => {
  // const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState<ICodeSnippet | null>(null);
  const [isScrollMoved, setIsScrollMoved] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLElement>();
  const snippets = useAppSelector((root: IRootState) => root.snippetsData.snippets);

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isLoading = useAppSelector((root: IRootState) => root.snippetsData.isLoading);

  const handleOnScroll = (event: Event) => setIsScrollMoved((event.target as HTMLElement).scrollTop !== 0);

  const handleClickScrollAnchorButton = () => {
    scrollToTop(scrollContainerRef);
  };

  const handleOnClickSnippet = (codeSnippet: ICodeSnippet | null) => setSelectedSnippet(codeSnippet);

  const handleCloseModal = () => setSelectedSnippet(null);

  useEffect(() => {
    !snippets.length && dispatch(snippetDuck.operations.fetchSnippets());

    window.addEventListener('scroll', handleOnScroll, true);

    return () => {
      window.removeEventListener('scroll', handleOnScroll, true);
    };
  }, []);

  return (
    <>
      <HomePageContainer ref={scrollContainerRef}>
        <SnippetsFilters scrollContainerRef={scrollContainerRef} />
        <SnippetsList onClickSnippet={handleOnClickSnippet} />
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
      <ModalDialog
        content={
          <SnippetCardContent codeSnippet={selectedSnippet} editorStyles={{ overflow: 'auto', maxHeight: '800px' }} />
        }
        isOpen={!!selectedSnippet}
        handleClose={handleCloseModal}
      />
      <MuiBackdrop isOpen={isLoading} />
    </>
  );
};

export default HomePage;
