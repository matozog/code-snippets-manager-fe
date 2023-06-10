import { FC } from 'react';
import { StyledRadioButton } from './radio.jss';

interface IRadioButtonProps {
  value: string;
}

const RadioButton: FC<IRadioButtonProps> = ({ value }) => {
  return <StyledRadioButton value={value} />;
};

export default RadioButton;
