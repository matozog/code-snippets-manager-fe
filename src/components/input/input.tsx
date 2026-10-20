import { ChangeEvent, FC, FocusEvent, KeyboardEvent } from 'react';

import { StyledTextField } from './input.jss';

interface IInputProps {
  id?: string;
  label: string;
  value: string;
  error?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
}

const Input: FC<IInputProps> = ({ value, onChange, label, id, onBlur, onKeyDown, error }) => {
  return (
    <StyledTextField
      id={id}
      value={value}
      onChange={onChange}
      label={label}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      error={!!error}
      helperText={error}
    />
  );
};

export default Input;
