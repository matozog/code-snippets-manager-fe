import * as snippetDuck from 'src/store/reducers/snippets';

import { IRootState, useAppDispatch, useAppSelector } from 'src/store/config/store';

import { HomePageContainer } from './home-page.jss';
import MuiBackdrop from 'src/components/backdrop/mui-backdrop';
import SnippetsFilters from './modules/snippets-filters/snippets-filters';
import SnippetsList from './modules/snippets-list/snippets-list';
import { useEffect } from 'react';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((root: IRootState) => root.snippetsData.isLoading);

  useEffect(() => {
    dispatch(snippetDuck.operations.fetchSnippets());
  }, []);

  return (
    <>
      <HomePageContainer>
        <SnippetsList />
        <SnippetsFilters />
      </HomePageContainer>
      <MuiBackdrop isOpen={isLoading} />
    </>
  );
};

export default HomePage;
