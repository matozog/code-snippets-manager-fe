import axios from 'axios';

export const requestAxios = axios.create();

export const HTTPService = {
  get: <T>(url: string) => requestAxios.get<T>(url),
  post: <T>(url: string, body: unknown) => requestAxios.post<T>(url, body),
  put: <T>(url: string, body: unknown) => requestAxios.put<T>(url, body),
  delete: (url: string) => requestAxios.delete(url),
};

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong!';
export const SESSION_EXPIRED_MESSAGE = 'Your session has expired. Please sign in again.';

// RFC 9457 problem details returned by the API
interface IProblemDetail {
  detail?: string;
  errors?: Record<string, string>;
}

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response?.status === 401) return SESSION_EXPIRED_MESSAGE;

  const problem: IProblemDetail | undefined = axios.isAxiosError(error) ? error.response?.data : undefined;
  const fieldErrors = Object.values(problem?.errors ?? {});

  if (fieldErrors.length) return fieldErrors.join(' ');
  return problem?.detail || DEFAULT_ERROR_MESSAGE;
};
