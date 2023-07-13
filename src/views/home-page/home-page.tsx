import * as snippetDuck from 'src/store/reducers/snippets';

import { HomePageContainer } from './home-page.jss';
import SnippetsFilters from './modules/snippets-filters/snippets-filters';
import SnippetsList from './modules/snippets-list/snippets-list';
import { useAppDispatch } from 'src/store/config/store';
import { useEffect } from 'react';

const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(snippetDuck.operations.fetchSnippets());
  }, []);

  return (
    <HomePageContainer>
      <SnippetsList />
      <SnippetsFilters />
    </HomePageContainer>
  );
};

export default HomePage;
