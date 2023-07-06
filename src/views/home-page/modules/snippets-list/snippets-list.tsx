import SnippetCard from 'src/components/snippet-card/snippet-card';
import { SnippetsListContainer } from './snippet-list.jss';
import snippetsList from 'src/assets/mocks/snippets.json';

const SnippetsList = () => {
  return (
    <SnippetsListContainer>
      {snippetsList.map((codeSnippet) => (
        <SnippetCard key={codeSnippet.id} codeSnippet={codeSnippet}></SnippetCard>
      ))}
    </SnippetsListContainer>
  );
};

export default SnippetsList;
