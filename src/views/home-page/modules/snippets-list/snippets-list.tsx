import * as snippetDuck from 'src/store/reducers/snippets';

import { IRootState, useAppSelector } from 'src/store/config/store';

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

  return (
    <SnippetsListContainer>
      {snippetsList.map((codeSnippet) => (
        <SnippetCard
          key={codeSnippet.id}
          codeSnippet={codeSnippet}
          onClickReadMoreButton={onClickSnippet}
        ></SnippetCard>
      ))}
    </SnippetsListContainer>
  );
};

export default SnippetsList;
