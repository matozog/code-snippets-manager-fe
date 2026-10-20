import { render, screen, waitFor, within } from '@testing-library/react';

import { ICodeSnippet, defaultCodeSnippet } from 'src/types/models';
import { MemoryRouter } from 'react-router';
import SnippetPage from './snippet-page';
import userEvent from '@testing-library/user-event';

const favoriteSnippet: ICodeSnippet = {
  idSnippet: 1,
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
    </MemoryRouter>,
  );

  const favouriteSwitch = screen.getByRole('switch', { name: 'Favourite:' });
  expect(favouriteSwitch).toBeChecked();

  await userEvent.click(favouriteSwitch);
  expect(favouriteSwitch).not.toBeChecked();

  await userEvent.click(screen.getByRole('button', { name: 'Save' }));
  await waitFor(() => expect(onClickSave).toHaveBeenCalledWith(expect.objectContaining({ favorite: false })));
});

const renderSnippetPage = (codeSnippet: ICodeSnippet, onClickSave = vi.fn()) => {
  render(
    <MemoryRouter>
      <SnippetPage codeSnippet={codeSnippet} onClickSave={onClickSave} />
    </MemoryRouter>,
  );
  return onClickSave;
};

test('shows validation errors and does not save an incomplete snippet', async () => {
  const onClickSave = renderSnippetPage(defaultCodeSnippet);

  await userEvent.click(screen.getByRole('button', { name: 'Save' }));

  expect(await screen.findByText('Name is required.')).toBeInTheDocument();
  expect(screen.getByText('Programming language is required.')).toBeInTheDocument();
  expect(screen.getByText('Minimum one tag is required.')).toBeInTheDocument();
  expect(onClickSave).not.toHaveBeenCalled();
});

test('adds trimmed unique tags with Enter, removes tags and saves the result', async () => {
  const onClickSave = renderSnippetPage(favoriteSnippet);
  const newTagInput = screen.getByRole('textbox', { name: 'New tag' });

  await userEvent.type(newTagInput, '  react  {enter}');
  expect(screen.getByRole('button', { name: '# react' })).toBeInTheDocument();
  expect(newTagInput).toHaveValue('');
  expect(onClickSave).not.toHaveBeenCalled();

  await userEvent.type(newTagInput, 'js');
  expect(screen.getByText('Tag already added.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
  await userEvent.clear(newTagInput);

  await userEvent.click(within(screen.getByRole('button', { name: '# js' })).getByTestId('CancelIcon'));
  expect(screen.queryByRole('button', { name: '# js' })).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: 'Save' }));
  await waitFor(() => expect(onClickSave).toHaveBeenCalledWith(expect.objectContaining({ tags: [{ name: 'react' }] })));
});
