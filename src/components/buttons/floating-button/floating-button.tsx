import { FC, MouseEvent, PropsWithChildren } from 'react';

import { StyledFab } from './floating-button.jss';

interface IFloatingButtonProps extends PropsWithChildren {
  id?: string;
  isVisible?: boolean;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  withFadeInAnimation?: boolean;
}

const FloatingButton: FC<IFloatingButtonProps> = ({ isVisible, withFadeInAnimation, onClick, id, children }) => {
  return (
    <StyledFab id={id} isVisible={isVisible} withFadeIn={withFadeInAnimation} onClick={onClick}>
      {children}
    </StyledFab>
  );
};

export default FloatingButton;
