import type { AppDispatch, IRootState } from 'src/store/config/store';
import { HTTPService, getErrorMessage } from 'src/store/services/http.service';

import { API_URL } from 'src/store/config/constants';
import { ICodeSnippet } from 'src/types/models';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { showNotification } from '../common/common.slice';

const SNIPPETS_URL = `${API_URL}/api/code-snippets`;

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: IRootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();

// ids and dates are assigned by the server, tags are matched by name only
export const toRequestBody = (snippet: ICodeSnippet) => ({
  ...snippet,
  idSnippet: undefined,
  addedDate: undefined,
  tags: snippet.tags.map(({ name }) => ({ name })),
});

const notifyError = (error: unknown, dispatch: AppDispatch): string => {
  const message = getErrorMessage(error);
  dispatch(showNotification({ type: 'error', message }));
  return message;
};

export const fetchSnippets = createAppAsyncThunk(
  'snippets/fetchSnippets',
  async (_: void, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await HTTPService.get<ICodeSnippet[]>(SNIPPETS_URL);
      return data;
    } catch (error) {
      return rejectWithValue(notifyError(error, dispatch));
    }
  },
);

export const fetchSnippet = createAppAsyncThunk(
  'snippets/fetchSnippet',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await HTTPService.get<ICodeSnippet>(`${SNIPPETS_URL}/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(notifyError(error, dispatch));
    }
  },
);

export const addNewSnippet = createAppAsyncThunk(
  'snippets/addNewSnippet',
  async (snippet: ICodeSnippet, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await HTTPService.post<ICodeSnippet>(SNIPPETS_URL, toRequestBody(snippet));
      dispatch(showNotification({ type: 'success', message: 'Added new snippet!' }));
      return data;
    } catch (error) {
      return rejectWithValue(notifyError(error, dispatch));
    }
  },
);

export const updateSnippet = createAppAsyncThunk(
  'snippets/updateSnippet',
  async ({ id, snippet }: { id: number; snippet: ICodeSnippet }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await HTTPService.put<ICodeSnippet>(`${SNIPPETS_URL}/${id}`, toRequestBody(snippet));
      dispatch(showNotification({ type: 'success', message: 'Updated snippet!' }));
      return data;
    } catch (error) {
      return rejectWithValue(notifyError(error, dispatch));
    }
  },
);

export const removeSnippet = createAppAsyncThunk(
  'snippets/removeSnippet',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await HTTPService.delete(`${SNIPPETS_URL}/${id}`);
      dispatch(showNotification({ type: 'success', message: 'Removed snippet!' }));
      return id;
    } catch (error) {
      return rejectWithValue(notifyError(error, dispatch));
    }
  },
);
