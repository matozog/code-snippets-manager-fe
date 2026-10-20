import { decodeIdToken, isIdTokenValid, loadStoredIdToken, storeIdToken } from './auth.utils';
import { signIn, signOut } from './auth.thunks';

import { createAppStore } from 'src/store/config/store';
import { createAuthState } from './auth.slice';
import { defaultCodeSnippet } from 'src/types/models';
import { fakeIdToken } from 'src/test-utils';

const expiredToken = () => fakeIdToken({ exp: Math.floor(Date.now() / 1000) - 60 });

afterEach(() => {
  localStorage.clear();
});

describe('Google ID token', () => {
  test('claims are decoded, including non-ASCII names', () => {
    expect(decodeIdToken(fakeIdToken({ name: 'Zażółć Gęślą' }))).toEqual(
      expect.objectContaining({ sub: 'google-sub-alice', email: 'alice@example.com', name: 'Zażółć Gęślą' }),
    );
  });

  test('malformed tokens are rejected', () => {
    expect(decodeIdToken('not-a-token')).toBeNull();
    expect(decodeIdToken('a.b.c')).toBeNull();
  });

  test('tokens expiring within the safety margin are treated as expired', () => {
    const now = Date.now();
    expect(isIdTokenValid(decodeIdToken(fakeIdToken({ exp: Math.floor(now / 1000) + 3600 })), now)).toBe(true);
    expect(isIdTokenValid(decodeIdToken(fakeIdToken({ exp: Math.floor(now / 1000) + 10 })), now)).toBe(false);
  });

  test('auth state exposes the user from the token and ignores expired tokens', () => {
    const idToken = fakeIdToken({ picture: 'https://example.com/alice.png' });

    expect(createAuthState(idToken)).toEqual({
      idToken,
      user: { name: 'Alice', email: 'alice@example.com', picture: 'https://example.com/alice.png' },
    });
    expect(createAuthState(expiredToken())).toEqual({ idToken: null, user: null });
  });
});

describe('stored session', () => {
  test('a valid token survives a page reload, an expired one is dropped', () => {
    const idToken = fakeIdToken();
    storeIdToken(idToken);
    expect(loadStoredIdToken()).toBe(idToken);

    storeIdToken(expiredToken());
    expect(loadStoredIdToken()).toBeNull();
    expect(localStorage.length).toBe(0);
  });

  test('sign in stores the session and sign out clears it together with the user data', () => {
    const store = createAppStore();
    const idToken = fakeIdToken();

    store.dispatch(signIn(idToken));
    expect(store.getState().auth.user?.email).toBe('alice@example.com');
    expect(loadStoredIdToken()).toBe(idToken);

    store.dispatch({ type: 'snippets/fetchSnippets/fulfilled', payload: [{ ...defaultCodeSnippet, name: 'secret' }] });
    store.dispatch(signOut());

    expect(store.getState().auth).toEqual({ idToken: null, user: null });
    expect(store.getState().snippetsData.snippets).toEqual([]);
    expect(loadStoredIdToken()).toBeNull();
  });

  test('an invalid credential is not accepted', () => {
    const store = createAppStore();

    store.dispatch(signIn(expiredToken()));

    expect(store.getState().auth.idToken).toBeNull();
    expect(store.getState().common.notifyProps).toEqual(expect.objectContaining({ isOpen: true, type: 'error' }));
  });
});
