import { ButtonContent, MuiButtonComp } from './button.jss';
import { FC, ReactElement } from 'react';

export type IconPlace = 'left' | 'right';

interface IMuiButtonProps {
  text: string;
  variant?: TButtonVariants;
  onClick?: () => void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  icon?: ReactElement;
  iconPlace?: IconPlace;
  type?: 'submit' | 'button' | 'reset';
}

export type TButtonVariants = 'text' | 'outlined' | 'contained';

const MuiButton: FC<IMuiButtonProps> = ({ text, variant, onClick, icon, iconPlace, type }) => {
  const renderButtonContentWithIcon = () => {
    if (!icon) return text;

    if (iconPlace === 'left') {
      return (
        <ButtonContent>
          <>{icon}</> {text}
        </ButtonContent>
      );
    }

    return (
      <ButtonContent>
        {text} <>{icon}</>
      </ButtonContent>
    );
  };

  return (
    <MuiButtonComp variant={variant} onClick={onClick} type={type}>
      {renderButtonContentWithIcon()}
    </MuiButtonComp>
  );
};

export default MuiButton;
