import * as commonDuck from 'src/store/reducers/common';
import * as snippetDuck from 'src/store/reducers/snippets';

import { IRootState, useAppDispatch, useAppSelector } from 'src/store/config/store';

import { FC } from 'react';
import { ICodeSnippet } from 'src/types/models';
import SnippetCard from 'src/components/snippet-card/snippet-card';
import { SnippetsListContainer } from './snippet-list.jss';

interface ISnippetListProps {
  onClickSnippet?: (codeSnippet: ICodeSnippet | null) => void;
}

const SnippetsList: FC<ISnippetListProps> = ({ onClickSnippet }) => {
  const snippetsList = useAppSelector((root: IRootState) =>
    snippetDuck.selectors.selectSortedAndFilteredSnippets({ ...root.snippetsData, ...root.snippetsFilters })
  );

  const dispatch = useAppDispatch();

  const handleOnClickCopySnippet = (content: string) => {
    navigator.clipboard.writeText(content);
    dispatch(
      commonDuck.operations.setNotifyProperties({ isOpen: true, message: 'Coppied to clipboard!', type: 'success' })
    );
  };

  return (
    <SnippetsListContainer>
      {snippetsList.map((codeSnippet) => (
        <SnippetCard
          key={codeSnippet.idSnippet}
          codeSnippet={codeSnippet}
          onClickReadMoreButton={onClickSnippet}
          onClickCopySnippet={handleOnClickCopySnippet}
        ></SnippetCard>
      ))}
    </SnippetsListContainer>
  );
};

export default SnippetsList;
