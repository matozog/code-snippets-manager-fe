import { HomePageContainer } from './home-page.jss';
import SnippetsFilters from './modules/snippets-filters/snippets-filters';
import SnippetsList from './modules/snippets-list/snippets-list';

const HomePage = () => {
  return (
    <HomePageContainer>
      <SnippetsList />
      <SnippetsFilters />
    </HomePageContainer>
  );
};

export default HomePage;
