import { render, screen } from '@testing-library/react';

import App from './App';
import { Provider } from 'react-redux';
import store from './store/config/store';

test('renders app header with logo', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText('Snippets Manager')).toBeInTheDocument();
});
