import { IGoogleIdTokenPayload } from './store/reducers/auth/auth.utils';

const base64Url = (value: object) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(value))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

/**
 * Builds a token shaped like a Google ID token (unsigned, the frontend only reads its claims).
 */
export const fakeIdToken = (claims: Partial<IGoogleIdTokenPayload> = {}) =>
  [
    base64Url({ alg: 'RS256', typ: 'JWT' }),
    base64Url({
      sub: 'google-sub-alice',
      email: 'alice@example.com',
      name: 'Alice',
      exp: Math.floor(Date.now() / 1000) + 3600,
      ...claims,
    }),
    'signature',
  ].join('.');
