import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AppRoutes from './app.routes';
import { HashRouter } from 'react-router-dom';
import HomePageHeader from './views/shared/header/home-page.header';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from './themes/app.theme';
import store from './store/config/store';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HomePageHeader />
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
