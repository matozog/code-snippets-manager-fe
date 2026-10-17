export const SUCCESS = (type: string) => `${type}_FULFILLED`;
export const REQUEST = (type: string) => `${type}_REQUEST`;
export const FAILURE = (type: string) => `${type}_FAILURE`;

export const API_URL = import.meta.env.DEV
  ? 'http://localhost:8090'
  : `https://code-snippets-manager-service.onrender.com`;

export interface ActionType<T, P, Z, W> {
  readonly type: T;
  readonly payload?: P;
  readonly meta?: Z;
  readonly error?: W;
}
