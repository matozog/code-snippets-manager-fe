import AppRoutes from './app.routes';
import { BrowserRouter } from 'react-router-dom';
import HomePageHeader from './views/shared/header/home-page.header';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from './themes/app.theme';
import store from './store/config/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <HomePageHeader />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
