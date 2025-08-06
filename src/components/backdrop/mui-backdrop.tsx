import { Backdrop, CircularProgress, Typography } from '@mui/material';

import { FC, useEffect, useState } from 'react';

interface IMuiBackdropProps {
  isOpen: boolean;
}

const MAX_WAITING_TIME_TO_MESSAGE = 3;

const MuiBackdrop: FC<IMuiBackdropProps> = ({ isOpen }) => {
  const [delay, setDelay] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isOpen) {
      interval = setInterval(() => {
        setDelay((prevState) => ++prevState);
      }, 1000);
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [isOpen]);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: 'flex', flexDirection: 'column' }}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
      {delay > MAX_WAITING_TIME_TO_MESSAGE && (
        <Typography mt={1} variant="h6" sx={{ maxWidth: '50%' }} align="center">
          If this is your first time launching the app and it's taking a while, it means the service is just starting
          up. This will take about a minute. <br /> Thank you for your patience.
        </Typography>
      )}
    </Backdrop>
  );
};

export default MuiBackdrop;
