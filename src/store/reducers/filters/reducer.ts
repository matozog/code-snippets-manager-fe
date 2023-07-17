import { ActionType } from 'src/store/config/constants';
import { SortByType } from './constants';
import types from './types';

export interface IFiltersData {
  sortByOptions: Map<SortByType, string>;
  programmingLanguages: Array<string>;
  types: Array<string>;
  creationPlaces: Array<string>;
}

const initialState = {
  sortBy: '' as SortByType,
  sortAsc: true,
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
    case types.CLEAR_FILTERS:
      return {
        ...state,
        programmingLanguage: [],
        type: [],
        creationPlace: [],
        addedBefore: null,
        addedAfter: null,
        favourite: false,
        sortBy: '',
        sortAsc: true,
      };
    default:
      return state;
  }
};
