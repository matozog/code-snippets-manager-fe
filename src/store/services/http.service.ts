import axios from 'axios';

export const requestAxios = axios.create();

export const HTTPService = {
  get: (url: string, config?: any): Promise<any> => requestAxios.get(url, config),
  post: (url: string, body: unknown, options?: Record<string, string>): Promise<any> =>
    requestAxios.post(url, body, options),
  put: (url: string, body: unknown, options?: Record<string, string>): Promise<any> =>
    requestAxios.put(url, body, options),
};
