import * as snippetDuck from 'src/store/reducers/snippets';

import { FC, useContext } from 'react';
import { IRootState, useAppSelector } from 'src/store/config/store';

import { ICodeSnippet } from 'src/types/models';
import { NotifyContext } from 'src/hooks/notifyContext';
import SnippetCard from 'src/components/snippet-card/snippet-card';
import { SnippetsListContainer } from './snippet-list.jss';

interface ISnippetListProps {
  onClickSnippet?: (codeSnippet: ICodeSnippet | null) => void;
}

const SnippetsList: FC<ISnippetListProps> = ({ onClickSnippet }) => {
  const snippetsList = useAppSelector((root: IRootState) =>
    snippetDuck.selectors.selectSortedAndFilteredSnippets({ ...root.snippetsData, ...root.snippetsFilters })
  );

  const { setNotifyProperties } = useContext(NotifyContext);

  const handleOnClickCopySnippet = (content: string) => {
    navigator.clipboard.writeText(content);
    setNotifyProperties({ isOpen: true, message: 'Coppied to clipboard!', type: 'success' });
  };

  return (
    <SnippetsListContainer>
      {snippetsList.map((codeSnippet) => (
        <SnippetCard
          key={codeSnippet.id}
          codeSnippet={codeSnippet}
          onClickReadMoreButton={onClickSnippet}
          onClickCopySnippet={handleOnClickCopySnippet}
        ></SnippetCard>
      ))}
    </SnippetsListContainer>
  );
};

export default SnippetsList;
