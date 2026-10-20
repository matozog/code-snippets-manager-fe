import axios, { HttpStatusCode } from 'axios';

import type { AppStore } from 'src/store/config/store';
import { requestAxios } from './http.service';
import { signOut } from 'src/store/reducers/auth/auth.thunks';

/**
 * Sends the signed-in user's Google ID token with every API request and signs the user out
 * when the API rejects it (Google ID tokens expire after an hour). Returns a function removing the interceptors.
 */
export const setupHttpInterceptors = (store: AppStore) => {
  const requestInterceptor = requestAxios.interceptors.request.use((config) => {
    const { idToken } = store.getState().auth;
    if (idToken) config.headers.Authorization = `Bearer ${idToken}`;
    return config;
  });

  const responseInterceptor = requestAxios.interceptors.response.use(undefined, (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === HttpStatusCode.Unauthorized &&
      store.getState().auth.idToken
    ) {
      store.dispatch(signOut());
    }
    return Promise.reject(error);
  });

  return () => {
    requestAxios.interceptors.request.eject(requestInterceptor);
    requestAxios.interceptors.response.eject(responseInterceptor);
  };
};
