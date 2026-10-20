import { render, screen } from '@testing-library/react';

import CustomCodeEditor from './code-editor';

test('code editor is read-only when it is not editable', () => {
  render(<CustomCodeEditor code="const a = 1;" editable={false} />);
  expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
});

test('code editor is editable by default', () => {
  render(<CustomCodeEditor code="const a = 1;" />);
  expect(screen.getByRole('textbox')).not.toHaveAttribute('readonly');
});
