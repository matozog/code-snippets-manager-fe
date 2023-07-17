import * as snippetDuck from 'src/store/reducers/snippets';

import { IRootState, useAppSelector } from 'src/store/config/store';

import SnippetCard from 'src/components/snippet-card/snippet-card';
import { SnippetsListContainer } from './snippet-list.jss';

const SnippetsList = () => {
  const snippetsList = useAppSelector((root: IRootState) =>
    snippetDuck.selectors.selectSortedAndFilteredSnippets({ ...root.snippetsData, ...root.snippetsFilters })
  );

  return (
    <SnippetsListContainer>
      {snippetsList.map((codeSnippet) => (
        <SnippetCard key={codeSnippet.id} codeSnippet={codeSnippet}></SnippetCard>
      ))}
    </SnippetsListContainer>
  );
};

export default SnippetsList;
