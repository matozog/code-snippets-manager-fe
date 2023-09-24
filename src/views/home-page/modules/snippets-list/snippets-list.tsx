import * as snippetDuck from 'src/store/reducers/snippets';

import { FC, useState } from 'react';
import { IRootState, useAppSelector } from 'src/store/config/store';

import { Box } from '@mui/material';
import { ICodeSnippet } from 'src/types/models';
import ModalDialog from 'src/components/modal-dialog/modal-dialog';
import SnippetCard from 'src/components/snippet-card/snippet-card';
import { SnippetsListContainer } from './snippet-list.jss';

interface ISnippetListProps {
  onClickSnippet?: (codeSnippet: ICodeSnippet | null) => void;
  onClickCopySnippet?: (content: string) => void;
  onClickRemoveSnippet?: (snippetId?: string) => void;
}

const SnippetsList: FC<ISnippetListProps> = ({ onClickSnippet, onClickRemoveSnippet, onClickCopySnippet }) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const snippetsList = useAppSelector((root: IRootState) =>
    snippetDuck.selectors.selectSortedAndFilteredSnippets({ ...root.snippetsData, ...root.snippetsFilters })
  );

  return (
    <SnippetsListContainer>
      {snippetsList.map((codeSnippet) => (
        <SnippetCard
          key={codeSnippet.idSnippet}
          codeSnippet={codeSnippet}
          onClickReadMoreButton={onClickSnippet}
          onClickCopySnippet={onClickCopySnippet}
          onClickRemoveSnippet={onClickRemoveSnippet}
        />
      ))}
      <ModalDialog isOpen={isOpenModal} content={<Box>Are you sure?</Box>} handleClose={() => setOpenModal(false)} />
    </SnippetsListContainer>
  );
};

export default SnippetsList;
