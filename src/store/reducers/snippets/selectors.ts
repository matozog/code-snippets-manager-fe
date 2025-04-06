import { filterByKeyword, filterSnippets, sortRecords } from './utils';

import { Dayjs } from 'dayjs';
import { ICodeSnippet } from 'src/types/models';
import { IFiltersState } from '../filters/reducer';
import { ISnippetsState } from './reducer';
import { SortByType } from '../filters/constants';
import { createSelector } from '@reduxjs/toolkit';

const getCodeSnippets = (state: ISnippetsState) => state.snippets;
const getProgrammingLanguages = (snippetsFilters: IFiltersState) => snippetsFilters.programmingLanguage;
const getTypes = (snippetsFilters: IFiltersState) => snippetsFilters.type;
const getCreationPlaces = (snippetsFilters: IFiltersState) => snippetsFilters.creationPlace;
const getAddedBefore = (snippetsFilters: IFiltersState) => snippetsFilters.addedBefore;
const getAddedAfter = (snippetsFilters: IFiltersState) => snippetsFilters.addedAfter;
const getFavourite = (snippetsFilters: IFiltersState) => snippetsFilters.favourite;
const getSortBy = (snippetsFilters: IFiltersState) => snippetsFilters.sortBy;
const getSortAsc = (snippetsFilters: IFiltersState) => snippetsFilters.sortAsc;
const getKeyword = (SnippetsFilters: IFiltersState) => SnippetsFilters.keyword;

const selectFilteredSnippets = createSelector(
  [
    getCodeSnippets,
    getProgrammingLanguages,
    getTypes,
    getCreationPlaces,
    getAddedAfter,
    getAddedBefore,
    getFavourite,
    getKeyword,
  ],
  (
    snippets: Array<ICodeSnippet>,
    programmingLanguages: Array<string>,
    types: Array<string>,
    creationPlaces: Array<string>,
    addedAfter: Dayjs | undefined,
    addedBefore: Dayjs | undefined,
    favourite: boolean,
    keyword: string,
  ): Array<ICodeSnippet> =>
    filterSnippets(
      filterByKeyword(snippets, keyword),
      programmingLanguages,
      types,
      creationPlaces,
      addedAfter,
      addedBefore,
      favourite,
    ),
);

const selectSortedAndFilteredSnippets = createSelector(
  [selectFilteredSnippets, getSortBy, getSortAsc],
  (filteredSnippets: Array<ICodeSnippet>, sortBy: SortByType, sortAsc: boolean): Array<ICodeSnippet> =>
    sortRecords(filteredSnippets, sortBy, sortAsc),
);

const selectCodeSnippetById = createSelector(
  [getCodeSnippets, (state, id) => id],
  (codeSnippets, id): ICodeSnippet | undefined => {
    return codeSnippets?.find((snippet) => snippet.idSnippet?.toString() === id);
  },
);

export { selectSortedAndFilteredSnippets, selectCodeSnippetById };
