// configured per mode in .env.development / .env.production, override locally in .env.local
export const API_URL = import.meta.env.VITE_API_URL;

// OAuth client id from Google Cloud Console; public, the API accepts only ID tokens issued for it
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '';
