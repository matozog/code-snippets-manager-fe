export const SUCCESS = (type: string) => `${type}_FULFILLED`;
export const REQUEST = (type: string) => `${type}_REQUEST`;
export const FAILURE = (type: string) => `${type}_FAILURE`;

export interface ActionType<T, P, Z, W> {
  readonly type: T;
  readonly payload?: P;
  readonly meta?: Z;
  readonly error?: W;
}
