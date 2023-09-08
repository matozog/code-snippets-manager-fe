import { Alert, Snackbar } from '@mui/material';

import { FC } from 'react';

export type TSnackbarSeverity = 'error' | 'warning' | 'success';

export interface IMuiSnackbarProps {
  isOpen: boolean;
  handleClose: () => void;
  type: TSnackbarSeverity;
  message: string;
}

const MuiSnackbar: FC<IMuiSnackbarProps> = ({ isOpen, handleClose, type, message }) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MuiSnackbar;
