import { Backdrop, CircularProgress } from '@mui/material';

import { FC } from 'react';

interface IMuiBackdropProps {
  isOpen: boolean;
}

const MuiBackdrop: FC<IMuiBackdropProps> = ({ isOpen }) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOpen}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default MuiBackdrop;
