import { ActionType } from 'src/store/config/constants';
import types from './types';

export interface IFiltersData {
  sortByOptions: Map<string, string>;
  programmingLanguages: Array<string>;
  types: Array<string>;
  creationPlaces: Array<string>;
}

const initialState = {
  sortBy: '',
  sortAsc: false,
  filtersData: {} as IFiltersData,
  programmingLanguage: [],
  type: [],
  creationPlace: [],
  addedBefore: null,
  addedAfter: null,
  favourite: false,
  isLoading: false,
};

export type IFiltersState = Readonly<typeof initialState>;

export default (
  state: IFiltersState = initialState,
  action: ActionType<string, Record<string, unknown>, any, unknown>
): IFiltersState => {
  const { type, meta } = action;

  switch (type) {
    case types.UPDATE_FILTERS_DATA:
      return { ...state, filtersData: meta?.data as IFiltersData };
    case types.CHANGE_FILTERS_FIELD: {
      const { fieldKey, value } = meta?.data || {};
      return {
        ...state,
        [fieldKey]: value,
      };
    }
    default:
      return state;
  }
};
