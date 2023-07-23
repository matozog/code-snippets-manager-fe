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
  const { type, payload, meta } = action;

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

    case types.ADD_NEW_SNIPPET:
      return {
        ...state,
        snippets: [...state.snippets, meta?.data as unknown as ICodeSnippet],
      };
    default:
      return state;
  }
};
