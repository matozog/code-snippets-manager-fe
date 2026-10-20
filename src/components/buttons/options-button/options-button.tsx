import { FC, MouseEvent, useId, useState } from 'react';
import { MoreInfoButton, StyledMenu } from './options-button.jss';

import { MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface IMenuItem {
  text: string;
  onClick: () => void;
}

interface IOptionsButtonProps {
  menuItemList: IMenuItem[];
}

const OptionsButton: FC<IOptionsButtonProps> = ({ menuItemList }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const buttonId = useId();
  const menuId = useId();
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
        id={buttonId}
        aria-label="More options"
        aria-controls={isOpen ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </MoreInfoButton>
      <StyledMenu
        id={menuId}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': buttonId,
          },
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
