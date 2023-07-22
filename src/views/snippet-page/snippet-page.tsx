import { NewSnippetPageContainer } from './snippet-page.jss';
import SnippetAttributes from './modules/snippet-attributes/snippet-attributes';
import SnippetContent from './modules/snippet-content/snippet-content';

const SnippetPage = () => {
  return (
    <NewSnippetPageContainer>
      <SnippetAttributes />
      <SnippetContent />
    </NewSnippetPageContainer>
  );
};

export default SnippetPage;
