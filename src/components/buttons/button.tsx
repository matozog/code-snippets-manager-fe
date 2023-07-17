import { FC } from 'react';
import { MuiButtonComp } from './button.jss';

interface IMuiButtonProps {
  text: string;
  variant?: TButtonVariants;
  onClick?: () => void;
}

export type TButtonVariants = 'text' | 'outlined' | 'contained';

const MuiButton: FC<IMuiButtonProps> = ({ text, variant, onClick }) => {
  return (
    <MuiButtonComp variant={variant} onClick={onClick}>
      {text}
    </MuiButtonComp>
  );
};

export default MuiButton;
