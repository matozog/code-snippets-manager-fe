import { Route, Routes } from 'react-router-dom';

import HomePage from './views/home-page/home-page';
import PageNotFound from './views/shared/page-not-found/page-not-found';
import SnippetDialog from './views/snippet-dialog/snippet-dialog';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="new-snippet" element={<SnippetDialog />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
