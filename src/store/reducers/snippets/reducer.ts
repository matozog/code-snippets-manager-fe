import { ActionType, FAILURE, REQUEST, SUCCESS } from 'src/store/config/constants';
import { ICodeSnippet, defaultCodeSnippet } from 'src/types/models';

import types from './types';

const initialState = {
  isLoading: false,
  snippets: [] as Array<ICodeSnippet>,
  snippet: defaultCodeSnippet,
  error: '',
};

export type ISnippetsState = Readonly<typeof initialState>;

export default (
  state: ISnippetsState = initialState,
  action: ActionType<string, Record<string, unknown>, Record<string, unknown>, unknown>
): ISnippetsState => {
  const { type, payload } = action;

  switch (type) {
    case REQUEST(types.FETCH_SNIPPETS):
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS(types.FETCH_SNIPPETS):
      return {
        ...state,
        isLoading: false,
        snippets: payload?.data as unknown as ICodeSnippet[],
      };
    case FAILURE(types.FETCH_SNIPPETS):
      return {
        ...state,
        isLoading: false,
        error: 'Error during fetching snippets',
      };
    case REQUEST(types.FETCH_SNIPPET):
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS(types.FETCH_SNIPPET):
      return {
        ...state,
        isLoading: false,
        snippet: payload?.data as unknown as ICodeSnippet,
      };
    case FAILURE(types.FETCH_SNIPPET):
      return {
        ...state,
        isLoading: false,
        error: 'Error during fetching snippets',
      };
    case REQUEST(types.ADD_NEW_SNIPPET):
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS(types.ADD_NEW_SNIPPET): {
      return {
        ...state,
        isLoading: false,
        snippets: [...state.snippets, payload?.data as unknown as ICodeSnippet],
      };
    }
    case FAILURE(types.ADD_NEW_SNIPPET):
      return {
        ...state,
        isLoading: false,
        error: 'Error during posting snippets',
      };
    case REQUEST(types.UPDATE_SNIPPET):
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS(types.UPDATE_SNIPPET): {
      console.log(payload?.data);
      const editedSnippet = payload?.data as ICodeSnippet;
      const editedSnippetIndex = state.snippets.findIndex((snippet) => snippet.idSnippet === editedSnippet.idSnippet);
      console.log(editedSnippetIndex, [...state.snippets].splice(editedSnippetIndex, 1, editedSnippet));
      return {
        ...state,
        isLoading: false,
        snippets:
          editedSnippetIndex >= 0
            ? [...state.snippets].splice(editedSnippetIndex, 1, editedSnippet)
            : [...state.snippets],
      };
    }
    case FAILURE(types.UPDATE_SNIPPET):
      return {
        ...state,
        isLoading: false,
        error: 'Error during posting snippets',
      };
    case types.CLEAR_CODE_SNIPPET:
      return {
        ...state,
        snippet: defaultCodeSnippet,
      };
    default:
      return state;
  }
};
