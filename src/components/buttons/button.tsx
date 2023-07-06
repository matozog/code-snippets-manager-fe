import { FC } from 'react';
import { MuiButtonComp } from './button.jss';

interface IMuiButtonProps {
  text: string;
  variant?: TButtonVariants;
}

export type TButtonVariants = 'text' | 'outlined' | 'contained';

const MuiButton: FC<IMuiButtonProps> = ({ text, variant }) => {
  return <MuiButtonComp variant={variant}>{text}</MuiButtonComp>;
};

export default MuiButton;
