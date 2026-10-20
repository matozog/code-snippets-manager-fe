import { fetchSnippets, removeSnippet } from 'src/store/reducers/snippets/snippets.thunks';
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
import { showNotification } from 'src/store/reducers/common/common.slice';
import { useAppDispatch } from 'src/store/config/store';

const HomePage = () => {
  const [removeSnippetModalStatus, setRemoveSnippetModalStatus] = useState<{
    isOpen: boolean;
    idSnippetToRemove: null | number;
  }>({ isOpen: false, idSnippetToRemove: null });
  const [selectedSnippet, setSelectedSnippet] = useState<ICodeSnippet | null>(null);
  const [isScrollMoved, setIsScrollMoved] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLElement>(null);

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOnScroll = () => {
    setIsScrollMoved(!!scrollContainerRef.current?.scrollTop);
  };

  const handleClickScrollAnchorButton = () => {
    scrollToTop(scrollContainerRef);
  };

  const handleOnClickSnippet = (codeSnippet: ICodeSnippet | null) => setSelectedSnippet(codeSnippet);

  const handleCloseSnippetModal = () => setSelectedSnippet(null);

  const handleCloseQuestionModal = () => setRemoveSnippetModalStatus({ isOpen: false, idSnippetToRemove: null });

  const handleOnClickCopySnippet = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      dispatch(showNotification({ type: 'success', message: 'Copied to clipboard!' }));
    } catch {
      dispatch(showNotification({ type: 'error', message: 'Could not copy to clipboard.' }));
    }
  };

  const handleOnClickRemoveSnippet = (snippetId?: number) => {
    setRemoveSnippetModalStatus({ isOpen: true, idSnippetToRemove: snippetId ?? null });
  };

  const handleConfirmRemoveSnippet = () => {
    const { idSnippetToRemove } = removeSnippetModalStatus;
    if (idSnippetToRemove !== null) {
      dispatch(removeSnippet(idSnippetToRemove));
      // the preview modal must not keep showing a snippet that is being removed
      if (selectedSnippet?.idSnippet === idSnippetToRemove) setSelectedSnippet(null);
    }
    handleCloseQuestionModal();
  };

  useEffect(() => {
    dispatch(fetchSnippets());
  }, [dispatch]);

  return (
    <>
      <HomePageContainer ref={scrollContainerRef} onScroll={handleOnScroll}>
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
            onClickCancel={handleCloseQuestionModal}
            onClickOk={handleConfirmRemoveSnippet}
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
