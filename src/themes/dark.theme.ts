import { Theme } from '@mui/material';
import { createTheme } from '@mui/system';

export const darkTheme = (appTheme: Theme) =>
  createTheme({
    ...appTheme,
    palette: {
      primary: {
        light: '#757ce8',
        main: '#201e20',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
      text: {
        primary: '#fff',
        secondary: '#000',
      },
    },
  });
