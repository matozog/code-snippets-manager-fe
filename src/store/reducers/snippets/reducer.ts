import { ActionType, FAILURE, REQUEST, SUCCESS } from 'src/store/config/constants';

import { ICodeSnippet } from 'src/types/models';
import types from './types';

const initialState = {
  isLoading: false,
  snippets: [] as Array<ICodeSnippet>,
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
    default:
      return state;
  }
};
