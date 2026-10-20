import { render, screen } from '@testing-library/react';

import App from './App';
import { AxiosResponse } from 'axios';
import { Provider } from 'react-redux';
import { createAppStore } from './store/config/store';
import { createAuthState } from './store/reducers/auth/auth.slice';
import { fakeIdToken } from './test-utils';
import { requestAxios } from './store/services/http.service';
import userEvent from '@testing-library/user-event';

const renderApp = (idToken: string | null) => {
  const store = createAppStore({ auth: createAuthState(idToken) });
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  return store;
};

afterEach(() => {
  vi.restoreAllMocks();
});

test('shows only the sign-in page to a signed-out user', () => {
  renderApp(null);

  expect(screen.getByRole('heading', { name: 'Snippets Manager' })).toBeInTheDocument();
  expect(screen.getByText(/sign in to store, search and organize/i)).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Add new snippet' })).not.toBeInTheDocument();
});

test('shows the application to a signed-in user and returns to sign-in page after signing out', async () => {
  vi.spyOn(requestAxios, 'get').mockResolvedValue({ data: [], status: 200 } as AxiosResponse);
  const store = renderApp(fakeIdToken());

  expect(screen.getByRole('button', { name: 'Add new snippet' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Alice' })).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: 'Sign out' }));

  expect(store.getState().auth.idToken).toBeNull();
  expect(screen.getByText(/sign in to store, search and organize/i)).toBeInTheDocument();
});
