import { useAppDispatch, useAppSelector } from './store/config/store';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AppRoutes from './app.routes';
import { GOOGLE_CLIENT_ID } from './store/config/constants';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HashRouter } from 'react-router';
import HomePageHeader from './views/shared/header/home-page.header';
import { LocalizationProvider } from '@mui/x-date-pickers';
import LoginPage from './views/login-page/login-page';
import MuiBackdrop from './components/backdrop/mui-backdrop';
import MuiSnackbar from './components/snackbar/snackbar';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from './themes/app.theme';
import { hideNotification } from './store/reducers/common/common.slice';
import { useEffect } from 'react';

function App() {
  const { isOpen, message, type } = useAppSelector((state) => state.common.notifyProps);
  const isLoading = useAppSelector((state) => state.snippetsData.isLoading);
  const isSignedIn = useAppSelector((state) => !!state.auth.idToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={appTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MuiSnackbar isOpen={isOpen} handleClose={() => dispatch(hideNotification())} type={type} message={message} />
          {/* the whole application is available only to signed-in users */}
          {isSignedIn ? (
            <HashRouter>
              <HomePageHeader />
              <AppRoutes />
            </HashRouter>
          ) : (
            <LoginPage />
          )}
          <MuiBackdrop isOpen={isLoading} />
        </LocalizationProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
