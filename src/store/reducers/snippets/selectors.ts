import { Dayjs } from 'dayjs';
import { ICodeSnippet } from 'src/types/models';
import { IFiltersState } from '../filters/reducer';
import { ISnippetsState } from './reducer';
import { createSelector } from '@reduxjs/toolkit';
import { filterSnippets } from './utils';

const getCodeSnippets = (state: ISnippetsState) => state.snippets;
const getProgrammingLanguages = (snippetsFilters: IFiltersState) => snippetsFilters.programmingLanguage;
const getTypes = (snippetsFilters: IFiltersState) => snippetsFilters.type;
const getCreationPlaces = (snippetsFilters: IFiltersState) => snippetsFilters.creationPlace;
const getAddedBefore = (snippetsFilters: IFiltersState) => snippetsFilters.addedBefore;
const getAddedAfter = (snippetsFilters: IFiltersState) => snippetsFilters.addedAfter;
const getFavourite = (snippetsFilters: IFiltersState) => snippetsFilters.favourite;

const selectFilteredSnippets = createSelector(
  [getCodeSnippets, getProgrammingLanguages, getTypes, getCreationPlaces, getAddedAfter, getAddedBefore, getFavourite],
  (
    snippets: Array<ICodeSnippet>,
    programmingLanguage: Array<string>,
    types: Array<string>,
    creationPlaces: Array<string>,
    addedAfter: Dayjs | null,
    addedBefore: Dayjs | null,
    favourite: boolean
  ): Array<ICodeSnippet> =>
    filterSnippets(snippets, programmingLanguage, types, creationPlaces, addedAfter, addedBefore, favourite)
);

const selectSortedAndFilteredSnippets = createSelector(
  [selectFilteredSnippets],
  (filteredSnippets: Array<ICodeSnippet>): Array<ICodeSnippet> => filteredSnippets
);

export { selectSortedAndFilteredSnippets };
