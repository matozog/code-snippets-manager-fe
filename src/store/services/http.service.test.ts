import { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';
import { DEFAULT_ERROR_MESSAGE, getErrorMessage } from './http.service';

const axiosErrorWithBody = (data: unknown) =>
  new AxiosError('Request failed', 'ERR_BAD_REQUEST', undefined, undefined, {
    data,
    status: 400,
    statusText: 'Bad Request',
    headers: {},
    config: { headers: new AxiosHeaders() },
  } as AxiosResponse);

describe('getErrorMessage', () => {
  test('joins field validation errors from the API', () => {
    const error = axiosErrorWithBody({
      detail: 'Validation failed.',
      errors: { name: 'Name is required.', 'tags[0].name': 'Tag name is required.' },
    });

    expect(getErrorMessage(error)).toBe('Name is required. Tag name is required.');
  });

  test('uses problem detail when there are no field errors', () => {
    expect(getErrorMessage(axiosErrorWithBody({ detail: 'Snippet 7 not found.' }))).toBe('Snippet 7 not found.');
  });

  test('falls back to a generic message when the server does not respond', () => {
    expect(getErrorMessage(new AxiosError('Network Error', 'ERR_NETWORK'))).toBe(DEFAULT_ERROR_MESSAGE);
    expect(getErrorMessage(new Error('boom'))).toBe(DEFAULT_ERROR_MESSAGE);
  });
});
