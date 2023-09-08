import * as commonDuck from './store/reducers/common';

import { IRootState, useAppDispatch, useAppSelector } from './store/config/store';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AppRoutes from './app.routes';
import { HashRouter } from 'react-router-dom';
import HomePageHeader from './views/shared/header/home-page.header';
import { LocalizationProvider } from '@mui/x-date-pickers';
import MuiSnackbar from './components/snackbar/snackbar';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from './themes/app.theme';
import { useEffect } from 'react';

function App() {
  const notifyProperties = useAppSelector((state: IRootState) => state.common.notifyProps);
  const { isOpen, message, type } = notifyProperties;

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiSnackbar
          isOpen={isOpen}
          handleClose={() =>
            dispatch(commonDuck.operations.setNotifyProperties({ ...notifyProperties, isOpen: false }))
          }
          type={type}
          message={message}
        />
        <HashRouter>
          <HomePageHeader />
          <AppRoutes />
        </HashRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
