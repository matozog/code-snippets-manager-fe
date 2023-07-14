import { ActionType, FAILURE, REQUEST, SUCCESS } from 'src/store/config/constants';

import types from './types';

export interface IFiltersData {
  sortByOptions: Array<string>;
  programmingLanguages: Array<string>;
  types: Array<string>;
  creationPlaces: Array<string>;
}

const initialState = {
  sortBy: '',
  sortAsc: false,
  filtersData: {} as IFiltersData,
  programmingLanguage: '',
  type: '',
  creationPlace: '',
  addedBefore: '',
  addedAfter: '',
  favourite: false,
  isLoading: false,
};

export type IAppliancesState = Readonly<typeof initialState>;

export default (
  state: IAppliancesState = initialState,
  action: ActionType<string, Record<string, unknown>, Record<string, unknown>, unknown>
): IAppliancesState => {
  const { type, payload, meta } = action;

  switch (type) {
    case types.UPDATE_FILTERS_DATA:
      console.log(meta?.data);
      return { ...state, filtersData: meta?.data as IFiltersData };
    case REQUEST(types.CHANGE_SORT_BY):
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS(types.CHANGE_SORT_BY):
      return {
        ...state,
        sortBy: payload?.data as string,
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
