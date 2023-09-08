import * as commonDuck from 'src/store/reducers/common';

import { API_URL, FAILURE, REQUEST, SUCCESS } from 'src/store/config/constants';

import { HTTPService } from 'src/store/services/http.service';
import { ICodeSnippet } from 'src/types/models';
import dayjs from 'dayjs';
import types from './types';

// const mockAxios = new MockAdapter(requestAxios, { delayResponse: 2000 });
// mockAxios.onGet('api/snippets').reply(200, snippetsList);

// FETCH SNIPPETS
const prepareFetchSnippets = () => ({
  type: REQUEST(types.FETCH_SNIPPETS),
});

const fetchSnippetsData = () => {
  const requestUrl = `${API_URL}/api/code-snippets`;

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
        dispatch(
          commonDuck.operations.setNotifyProperties({ isOpen: true, type: 'error', message: 'Something gone wrong!' })
        );
      });
};

export const fetchSnippets = () => (dispatch: any) => {
  dispatch(prepareFetchSnippets());
  dispatch(fetchSnippetsData());
};

// FETCH SNIPPET
const prepareFetchSnippet = () => ({
  type: REQUEST(types.FETCH_SNIPPET),
});

const fetchSnippetData = (id: string) => {
  const requestUrl = `${API_URL}/api/code-snippets/${id}`;

  return (dispatch: any) =>
    HTTPService.get(requestUrl)
      .then((res) => {
        dispatch({
          type: SUCCESS(types.FETCH_SNIPPET),
          payload: {
            data: res.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: FAILURE(types.FETCH_SNIPPET),
          error,
        });
        dispatch(
          commonDuck.operations.setNotifyProperties({ isOpen: true, type: 'error', message: 'Something gone wrong!' })
        );
      });
};

export const fetchSnippet = (id: string) => (dispatch: any) => {
  dispatch(prepareFetchSnippet());
  dispatch(fetchSnippetData(id));
};

// ADD NEW SNIPPET
const prepareAddNewSnippet = () => ({
  type: REQUEST(types.ADD_NEW_SNIPPET),
});

const postNewSnippet = (newSnippet: ICodeSnippet, successAction: () => void) => {
  const requestUrl = `${API_URL}/api/code-snippets`;

  return (dispatch: any) =>
    HTTPService.post(requestUrl, { ...newSnippet, addedDate: dayjs(newSnippet.addedDate).format('YYYY-MM-DD') })
      .then((res) => {
        dispatch({
          type: SUCCESS(types.ADD_NEW_SNIPPET),
          payload: {
            data: res.data,
          },
        });
        dispatch(
          commonDuck.operations.setNotifyProperties({ isOpen: true, type: 'success', message: 'Added new snippet!' })
        );
        successAction();
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: FAILURE(types.ADD_NEW_SNIPPET),
          error,
        });
        dispatch(
          commonDuck.operations.setNotifyProperties({ isOpen: true, type: 'error', message: 'Something gone wrong!' })
        );
      });
};

export const addNewSnippet = (newSnippet: ICodeSnippet, successAction: () => void) => (dispatch: any) => {
  dispatch(prepareAddNewSnippet());
  dispatch(postNewSnippet(newSnippet, successAction));
};

// UPDATE SNIPPET
const prepareUpdateSnippet = () => ({
  type: REQUEST(types.UPDATE_SNIPPET),
});

const updateSnippetData = (newSnippet: ICodeSnippet, successAction: () => void, id: string) => {
  const requestUrl = `${API_URL}/api/code-snippets/${id}`;

  return (dispatch: any) =>
    HTTPService.put(requestUrl, { ...newSnippet, addedDate: dayjs(newSnippet.addedDate).format('YYYY-MM-DD') })
      .then((res) => {
        dispatch({
          type: SUCCESS(types.UPDATE_SNIPPET),
          payload: {
            data: res.data,
          },
        });
        dispatch(
          commonDuck.operations.setNotifyProperties({ isOpen: true, type: 'success', message: 'Updated snippet!' })
        );
        successAction();
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: FAILURE(types.UPDATE_SNIPPET),
          error,
        });
        dispatch(
          commonDuck.operations.setNotifyProperties({ isOpen: true, type: 'error', message: 'Something gone wrong!' })
        );
      });
};

export const updateSnippet = (newSnippet: ICodeSnippet, successAction: () => void, id: string) => (dispatch: any) => {
  dispatch(prepareUpdateSnippet());
  dispatch(updateSnippetData(newSnippet, successAction, id));
};

export const clearCodeSnippet = () => ({
  type: types.CLEAR_CODE_SNIPPET,
});
