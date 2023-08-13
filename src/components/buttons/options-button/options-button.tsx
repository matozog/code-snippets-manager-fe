import { FC, useState } from 'react';
import { MoreInfoButton, StyledMenu } from './options-button.jss';

import { MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface IOptionsButtonProps {
  isOpen: boolean;
}

const OptionsButton: FC<IOptionsButtonProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Copy</MenuItem>
      </StyledMenu>
    </>
  );
};

export default OptionsButton;
