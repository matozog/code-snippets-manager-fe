import { BurgerMenuButton, BurgerMenuContainer, BurgerMenuLabel } from './burger-menu.jss';

import { FC } from 'react';
import { IMenuItemProps } from '../../home-page.header';

interface IBurgerMenuProps {
  isOpen: boolean;
  itemsList: IMenuItemProps[];
}

const BurgerMenu: FC<IBurgerMenuProps> = ({ isOpen, itemsList }) => {
  return (
    <BurgerMenuContainer>
      {itemsList.map((item) => (
        <BurgerMenuButton key={item.label} isOpen={isOpen} onClick={item.action}>
          {item.icon}
          <BurgerMenuLabel>{item.label}</BurgerMenuLabel>
        </BurgerMenuButton>
      ))}
    </BurgerMenuContainer>
  );
};

export default BurgerMenu;
