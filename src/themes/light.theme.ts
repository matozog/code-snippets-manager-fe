import { Theme } from '@mui/material';
import { createTheme } from '@mui/system';

export const lightTheme = (appTheme: Theme) =>
  createTheme({
    ...appTheme,
  });
