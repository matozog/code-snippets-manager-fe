import { Alert, Typography } from '@mui/material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { LoginCard, LoginPageContainer, LoginTitle } from './login-page.jss';

import { GOOGLE_CLIENT_ID } from 'src/store/config/constants';
import MuiPaper from 'src/components/paper/mui-paper';
import { showNotification } from 'src/store/reducers/common/common.slice';
import { signIn } from 'src/store/reducers/auth/auth.thunks';
import { useAppDispatch } from 'src/store/config/store';

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const handleSuccess = ({ credential }: CredentialResponse) => {
    if (credential) dispatch(signIn(credential));
  };

  const handleError = () =>
    dispatch(showNotification({ type: 'error', message: 'Google sign-in failed. Please try again.' }));

  return (
    <LoginPageContainer>
      <MuiPaper elevation={8}>
        <LoginCard>
          <LoginTitle variant="h1">Snippets Manager</LoginTitle>
          <Typography>Sign in to store, search and organize your code snippets.</Typography>
          {GOOGLE_CLIENT_ID ? (
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} auto_select />
          ) : (
            <Alert severity="warning">Google sign-in is not configured (VITE_GOOGLE_CLIENT_ID is missing).</Alert>
          )}
        </LoginCard>
      </MuiPaper>
    </LoginPageContainer>
  );
};

export default LoginPage;
