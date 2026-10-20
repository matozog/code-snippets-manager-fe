import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortByType } from './constants';
import { signedOut } from '../auth/auth.slice';

export interface IFiltersState {
  keyword: string;
  sortBy: SortByType;
  sortAsc: boolean;
  programmingLanguage: string[];
  type: string[];
  creationPlace: string[];
  // dates are stored as FILTER_DATE_FORMAT strings to keep the state serializable
  addedAfter: string | null;
  addedBefore: string | null;
  favourite: boolean;
}

const initialState: IFiltersState = {
  keyword: '',
  sortBy: '',
  sortAsc: true,
  programmingLanguage: [],
  type: [],
  creationPlace: [],
  addedAfter: null,
  addedBefore: null,
  favourite: false,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilters: (state, action: PayloadAction<Partial<IFiltersState>>) => ({ ...state, ...action.payload }),
    // the search keyword lives in the header, so it is not cleared together with the filters panel
    clearFilters: (state) => ({ ...initialState, keyword: state.keyword }),
  },
  extraReducers: (builder) => {
    builder.addCase(signedOut, () => initialState);
  },
});

export const { changeFilters, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
