import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { decodeIdToken, isIdTokenValid, loadStoredIdToken } from './auth.utils';

export interface IAuthUser {
  name: string;
  email: string;
  picture?: string;
}

export interface IAuthState {
  // Google ID token sent to the API as a Bearer token
  idToken: string | null;
  user: IAuthUser | null;
}

const signedOutState: IAuthState = { idToken: null, user: null };

export const createAuthState = (idToken: string | null): IAuthState => {
  const payload = idToken ? decodeIdToken(idToken) : null;
  if (!idToken || !payload || !isIdTokenValid(payload)) return signedOutState;

  const email = payload.email ?? '';
  return { idToken, user: { name: payload.name || email, email, picture: payload.picture } };
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: () => createAuthState(loadStoredIdToken()),
  reducers: {
    signedIn: (_state, action: PayloadAction<string>) => createAuthState(action.payload),
    signedOut: () => signedOutState,
  },
});

export const { signedIn, signedOut } = authSlice.actions;

export default authSlice.reducer;
