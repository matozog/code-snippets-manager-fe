import { Theme } from '@emotion/react';
import { createTheme } from '@mui/system';

export const lightTheme = (appTheme: Theme) =>
  createTheme({
    ...appTheme,
  });
