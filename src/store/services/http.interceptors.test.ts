import { AxiosError, AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { createAppStore } from 'src/store/config/store';
import { createAuthState } from 'src/store/reducers/auth/auth.slice';
import { fakeIdToken } from 'src/test-utils';
import { requestAxios } from './http.service';
import { setupHttpInterceptors } from './http.interceptors';

const respondWith = (status: number) => (config: InternalAxiosRequestConfig) => {
  const response = { data: {}, status, statusText: '', headers: {}, config } as AxiosResponse;
  return status < 400
    ? Promise.resolve(response)
    : Promise.reject(new AxiosError('Request failed', 'ERR_BAD_REQUEST', config, undefined, response));
};

describe('http interceptors', () => {
  let removeInterceptors: () => void;
  let defaultAdapter: typeof requestAxios.defaults.adapter;

  beforeEach(() => {
    defaultAdapter = requestAxios.defaults.adapter;
  });

  afterEach(() => {
    removeInterceptors();
    requestAxios.defaults.adapter = defaultAdapter;
  });

  test('sends the ID token of the signed-in user', async () => {
    const idToken = fakeIdToken();
    const store = createAppStore({ auth: createAuthState(idToken) });
    removeInterceptors = setupHttpInterceptors(store);
    const adapter = vi.fn(respondWith(200));
    requestAxios.defaults.adapter = adapter;

    await requestAxios.get('/api/code-snippets');

    expect((adapter.mock.calls[0][0].headers as AxiosHeaders).get('Authorization')).toBe(`Bearer ${idToken}`);
  });

  test('does not send an Authorization header when nobody is signed in', async () => {
    removeInterceptors = setupHttpInterceptors(createAppStore({ auth: createAuthState(null) }));
    const adapter = vi.fn(respondWith(200));
    requestAxios.defaults.adapter = adapter;

    await requestAxios.get('/api/code-snippets');

    expect((adapter.mock.calls[0][0].headers as AxiosHeaders).has('Authorization')).toBe(false);
  });

  test('signs the user out when the API rejects the token', async () => {
    const store = createAppStore({ auth: createAuthState(fakeIdToken()) });
    removeInterceptors = setupHttpInterceptors(store);
    requestAxios.defaults.adapter = respondWith(401);

    await expect(requestAxios.get('/api/code-snippets')).rejects.toBeInstanceOf(AxiosError);

    expect(store.getState().auth.idToken).toBeNull();
  });

  test('keeps the user signed in on other errors', async () => {
    const store = createAppStore({ auth: createAuthState(fakeIdToken()) });
    removeInterceptors = setupHttpInterceptors(store);
    requestAxios.defaults.adapter = respondWith(500);

    await expect(requestAxios.get('/api/code-snippets')).rejects.toBeInstanceOf(AxiosError);

    expect(store.getState().auth.idToken).not.toBeNull();
  });
});
