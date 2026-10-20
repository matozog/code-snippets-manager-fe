import { filterSnippets, getFilterOptions, sortRecords } from './utils';

import { IRootState } from 'src/store/config/store';
import { createSelector } from '@reduxjs/toolkit';

const selectSnippets = (state: IRootState) => state.snippetsData.snippets;
const selectFilters = (state: IRootState) => state.snippetsFilters;

export const selectVisibleSnippets = createSelector([selectSnippets, selectFilters], (snippets, filters) =>
  sortRecords(filterSnippets(snippets, filters), filters.sortBy, filters.sortAsc),
);

// values offered in the filter dropdowns, based on the loaded snippets
export const selectFilterOptions = createSelector([selectSnippets], getFilterOptions);
