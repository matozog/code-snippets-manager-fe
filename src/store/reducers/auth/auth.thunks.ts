import { createAuthState, signedIn, signedOut } from './auth.slice';

import type { AppThunk } from 'src/store/config/store';
import { googleLogout } from '@react-oauth/google';
import { showNotification } from '../common/common.slice';
import { storeIdToken } from './auth.utils';

export const signIn =
  (idToken: string): AppThunk =>
  (dispatch) => {
    if (!createAuthState(idToken).idToken) {
      dispatch(showNotification({ type: 'error', message: 'Google sign-in failed. Please try again.' }));
      return;
    }
    storeIdToken(idToken);
    dispatch(signedIn(idToken));
  };

export const signOut = (): AppThunk => (dispatch) => {
  storeIdToken(null);
  // stops Google from signing the user back in automatically
  googleLogout();
  dispatch(signedOut());
};
