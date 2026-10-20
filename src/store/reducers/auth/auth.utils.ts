const STORAGE_KEY = 'snippets-manager.id-token';

// tokens about to expire are treated as expired, so a request does not fail in flight
const EXPIRY_MARGIN_MS = 30_000;

export interface IGoogleIdTokenPayload {
  sub: string;
  exp: number;
  email?: string;
  name?: string;
  picture?: string;
}

/**
 * Reads the claims of a Google ID token. The signature is verified by the API, not here.
 */
export const decodeIdToken = (idToken: string): IGoogleIdTokenPayload | null => {
  try {
    const base64 = idToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
    const payload = JSON.parse(new TextDecoder().decode(bytes));
    return typeof payload?.sub === 'string' && typeof payload?.exp === 'number' ? payload : null;
  } catch {
    return null;
  }
};

export const isIdTokenValid = (payload: IGoogleIdTokenPayload | null, now = Date.now()): boolean =>
  !!payload && payload.exp * 1000 > now + EXPIRY_MARGIN_MS;

// storage can be unavailable (private mode, blocked site data), the app then simply asks to sign in again
export const loadStoredIdToken = (): string | null => {
  try {
    const idToken = localStorage.getItem(STORAGE_KEY);
    if (idToken && isIdTokenValid(decodeIdToken(idToken))) return idToken;
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  return null;
};

export const storeIdToken = (idToken: string | null) => {
  try {
    if (idToken) localStorage.setItem(STORAGE_KEY, idToken);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};
