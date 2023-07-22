import { ChangeEvent, FC } from 'react';

import { StyledTextField } from './input.jss';

interface IInputProps {
  label: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IInputProps> = ({ value, onChange, label }) => {
  return <StyledTextField value={value} onChange={onChange} label={label} />;
};

export default Input;
