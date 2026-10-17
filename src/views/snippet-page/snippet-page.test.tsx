import { render, screen, waitFor } from '@testing-library/react';

import { ICodeSnippet } from 'src/types/models';
import { MemoryRouter } from 'react-router';
import SnippetPage from './snippet-page';
import userEvent from '@testing-library/user-event';

const favoriteSnippet: ICodeSnippet = {
  idSnippet: '1',
  name: 'Debounce',
  description: '',
  content: 'const a = 1;',
  favorite: true,
  programmingLanguage: 'javascript',
  type: 'Function',
  addedFrom: 'Local',
  addedDate: '2026-10-10',
  tags: [{ name: 'js' }],
};

test('favourite switch reflects snippet state and saves toggled value', async () => {
  const onClickSave = vi.fn();
  render(
    <MemoryRouter>
      <SnippetPage codeSnippet={favoriteSnippet} onClickSave={onClickSave} />
    </MemoryRouter>
  );

  const favouriteSwitch = screen.getByRole('switch', { name: 'Favourite:' });
  expect(favouriteSwitch).toBeChecked();

  await userEvent.click(favouriteSwitch);
  expect(favouriteSwitch).not.toBeChecked();

  await userEvent.click(screen.getByRole('button', { name: 'Save' }));
  await waitFor(() => expect(onClickSave).toHaveBeenCalledWith(expect.objectContaining({ favorite: false })));
});
