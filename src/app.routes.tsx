import { Route, Routes } from 'react-router-dom';

import EditSnippet from './views/edit-snippet-page/edit-snippet';
import HomePage from './views/home-page/home-page';
import NewSnippet from './views/new-snippet-page/new-snippet';
import PageNotFound from './views/shared/page-not-found/page-not-found';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="new-snippet" element={<NewSnippet />} />
      <Route path="edit-snippet/:id" element={<EditSnippet />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
