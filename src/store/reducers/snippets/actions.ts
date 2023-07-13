import { FAILURE, REQUEST, SUCCESS } from 'src/store/config/constants';
import { HTTPService, requestAxios } from 'src/store/services/http.service';

import MockAdapter from 'axios-mock-adapter';
import snippetsList from 'src/assets/mocks/snippets.json';
import types from './types';

const mockAxios = new MockAdapter(requestAxios, { delayResponse: 2000 });
mockAxios.onGet('api/snippets').reply(200, snippetsList);

// FETCH SNIPPETS
const prepareFetchSnippets = () => ({
  type: REQUEST(types.FETCH_SNIPPETS),
});

const fetchSnippetsData = () => {
  const requestUrl = 'api/snippets';

  return (dispatch: any) =>
    HTTPService.get(requestUrl)
      .then((res) => {
        dispatch({
          type: SUCCESS(types.FETCH_SNIPPETS),
          payload: {
            data: res.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: FAILURE(types.FETCH_SNIPPETS),
          error,
        });
      });
};

export const fetchSnippets = () => (dispatch: any) => {
  dispatch(prepareFetchSnippets());
  dispatch(fetchSnippetsData());
};
