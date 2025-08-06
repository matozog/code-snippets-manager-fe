import * as commonDuck from 'src/store/reducers/common';
import * as filtersDuck from 'src/store/reducers/filters';
import * as snippetDuck from 'src/store/reducers/snippets';

import { IRootState, useAppDispatch, useAppSelector } from 'src/store/config/store';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

import FloatingButton from 'src/components/buttons/floating-button/floating-button';
import { HomePageContainer } from './home-page.jss';
import { ICodeSnippet } from 'src/types/models';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ModalDialog from 'src/components/modal-dialog/modal-dialog';
import QuestionModal from 'src/components/modal-dialog/question-modal/question-modal';
import SnippetCardContent from 'src/components/snippet-card/content/snippet-card.content';
import SnippetModal from 'src/components/modal-dialog/snippet-modal/snippet-modal';
import SnippetsFilters from './modules/snippets-filters/snippets-filters';
import SnippetsList from './modules/snippets-list/snippets-list';
import { scrollToTop } from 'src/utils/utils';

const HomePage = () => {
  const [removeSnippetModalStatus, setRemoveSnippetModalStatus] = useState<{
    isOpen: boolean;
    idSnippetToRemove: null | string;
  }>({ isOpen: false, idSnippetToRemove: null });
  const [selectedSnippet, setSelectedSnippet] = useState<ICodeSnippet | null>(null);
  const [isScrollMoved, setIsScrollMoved] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLElement>();
  const snippets = useAppSelector((root: IRootState) => root.snippetsData.snippets);

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOnScroll = () => {
    setIsScrollMoved((scrollContainerRef.current as HTMLElement).scrollTop !== 0);
  };

  const handleClickScrollAnchorButton = () => {
    scrollToTop(scrollContainerRef);
  };

  const handleOnClickSnippet = (codeSnippet: ICodeSnippet | null) => setSelectedSnippet(codeSnippet);

  const handleCloseSnippetModal = () => setSelectedSnippet(null);

  const handleCloseQuestionModal = () => setRemoveSnippetModalStatus({ isOpen: false, idSnippetToRemove: null });

  const handleOnClickCopySnippet = (content: string) => {
    navigator.clipboard.writeText(content);
    dispatch(
      commonDuck.operations.setNotifyProperties({ isOpen: true, message: 'Coppied to clipboard!', type: 'success' }),
    );
  };

  const handleOnClickRemoveSnippet = (snippetId?: string) => {
    setRemoveSnippetModalStatus({ isOpen: true, idSnippetToRemove: snippetId || null });
  };

  useEffect(() => {
    dispatch(snippetDuck.operations.fetchSnippets());

    scrollContainerRef?.current?.addEventListener('scroll', handleOnScroll, true);

    return () => {
      scrollContainerRef?.current?.removeEventListener('scroll', handleOnScroll, true);
    };
  }, []);

  useEffect(() => {
    dispatch(filtersDuck.operations.updateFiltersData(snippets));
  }, [snippets]);

  return (
    <>
      <HomePageContainer ref={scrollContainerRef}>
        <SnippetsFilters scrollContainerRef={scrollContainerRef} />
        <SnippetsList
          onClickSnippet={handleOnClickSnippet}
          onClickCopySnippet={handleOnClickCopySnippet}
          onClickRemoveSnippet={handleOnClickRemoveSnippet}
        />
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
          <SnippetModal>
            <SnippetCardContent
              codeSnippet={selectedSnippet}
              editorStyles={{ overflow: 'auto' }}
              onClickCopySnippet={handleOnClickCopySnippet}
              onClickRemoveSnippet={handleOnClickRemoveSnippet}
            />
          </SnippetModal>
        }
        style={{ height: '80%' }}
        isOpen={!!selectedSnippet}
        handleClose={handleCloseSnippetModal}
      />
      <ModalDialog
        content={
          <QuestionModal
            content="Are you sure you want to remove snippet?"
            onClickCancel={() => setRemoveSnippetModalStatus({ isOpen: false, idSnippetToRemove: null })}
            onClickOk={() => {
              removeSnippetModalStatus.idSnippetToRemove &&
                dispatch(snippetDuck.operations.removeSnippet(removeSnippetModalStatus.idSnippetToRemove));
              handleCloseQuestionModal();
            }}
          />
        }
        style={{ height: 'auto' }}
        isOpen={removeSnippetModalStatus.isOpen}
        handleClose={handleCloseQuestionModal}
      />
    </>
  );
};

export default HomePage;
