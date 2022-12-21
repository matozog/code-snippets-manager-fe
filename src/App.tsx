import AppRoutes from './app.routes';
import { BrowserRouter } from 'react-router-dom';
import HomePageHeader from './views/shared/header/home-page.header';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from './themes/app.theme';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <HomePageHeader />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
