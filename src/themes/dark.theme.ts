import { Theme } from '@emotion/react';
import { createTheme } from '@mui/system';

export const darkTheme = (appTheme: Theme) =>
  createTheme({
    ...appTheme,
  });
