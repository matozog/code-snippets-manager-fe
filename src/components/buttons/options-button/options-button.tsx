import { FC, MouseEvent, useState } from 'react';
import { MoreInfoButton, StyledMenu } from './options-button.jss';

import { MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface IMenuItem {
  text: string;
  onClick: () => void;
}

interface IOptionsButtonProps {
  isOpen: boolean;
  menuItemList: IMenuItem[];
}

const OptionsButton: FC<IOptionsButtonProps> = ({ menuItemList }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickItem = (item: IMenuItem) => {
    item.onClick();
    handleClose();
  };

  return (
    <>
      <MoreInfoButton
        id="basic-button"
        aria-controls={isOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </MoreInfoButton>
      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItemList.map((item) => (
          <MenuItem key={item.text} onClick={() => handleClickItem(item)}>
            {item.text}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default OptionsButton;
