import { ChangeEvent, FC } from 'react';

import { StyledTextField } from './input.jss';

interface IInputProps {
  id?: string;
  label: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: any) => void;
}

const Input: FC<IInputProps> = ({ value, onChange, label, id, onBlur }) => {
  return <StyledTextField id={id} value={value} onChange={onChange} label={label} onBlur={onBlur} />;
};

export default Input;
