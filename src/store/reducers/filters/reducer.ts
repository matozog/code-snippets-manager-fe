import { ActionType, FAILURE, REQUEST, SUCCESS } from 'src/store/config/constants';

import types from './types';

const initialState = {
  sortBy: '',
  isLoading: false,
};

export type IAppliancesState = Readonly<typeof initialState>;

export default (
  state: IAppliancesState = initialState,
  action: ActionType<string, unknown, unknown, unknown>
): IAppliancesState => {
  const { type, payload } = action;

  switch (type) {
    case REQUEST(types.CHANGE_SORT_BY):
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS(types.CHANGE_SORT_BY):
      return {
        ...state,
        sortBy: payload as string,
        isLoading: false,
      };
    case FAILURE(types.CHANGE_SORT_BY):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
