import dayjs from 'dayjs';

import { ICodeSnippet } from 'src/types/models';
import { IFiltersState } from '../filters/filters.slice';
import { SortByType } from '../filters/constants';

export type ISnippetFilterCriteria = Pick<
  IFiltersState,
  'keyword' | 'programmingLanguage' | 'type' | 'creationPlace' | 'addedAfter' | 'addedBefore' | 'favourite'
>;

// an empty selection means "any value"
const matchesSelection = (value: string | null | undefined, selected: string[]) =>
  selected.length === 0 || (!!value && selected.includes(value));

// bounds are inclusive and compared with day precision
const isWithinDates = (value: string | undefined, addedAfter: string | null, addedBefore: string | null) => {
  if (!addedAfter && !addedBefore) return true;
  if (!value) return false;

  const date = dayjs(value);
  return (!addedAfter || !date.isBefore(addedAfter, 'day')) && (!addedBefore || !date.isAfter(addedBefore, 'day'));
};

export const filterSnippets = (snippets: ICodeSnippet[], criteria: ISnippetFilterCriteria): ICodeSnippet[] => {
  const keyword = criteria.keyword.trim().toLocaleLowerCase();

  return snippets.filter(
    (snippet) =>
      snippet.name.toLocaleLowerCase().includes(keyword) &&
      matchesSelection(snippet.programmingLanguage, criteria.programmingLanguage) &&
      matchesSelection(snippet.type, criteria.type) &&
      matchesSelection(snippet.addedFrom, criteria.creationPlace) &&
      isWithinDates(snippet.addedDate, criteria.addedAfter, criteria.addedBefore) &&
      (!criteria.favourite || snippet.favorite),
  );
};

const isEmpty = (value: unknown) => value === null || value === undefined || value === '';

export const sortRecords = (snippets: ICodeSnippet[], sortBy: SortByType, sortAsc: boolean): ICodeSnippet[] => {
  if (sortBy === '') return snippets;

  const direction = sortAsc ? 1 : -1;

  return [...snippets].sort((a, b) => {
    const first = a[sortBy];
    const second = b[sortBy];

    // snippets without a value always go last, regardless of the direction
    if (isEmpty(first) || isEmpty(second)) return Number(isEmpty(first)) - Number(isEmpty(second));
    // ascending order puts favourites first
    if (typeof first === 'boolean' && typeof second === 'boolean') return direction * (Number(second) - Number(first));
    return direction * String(first).localeCompare(String(second));
  });
};

const uniqueValues = (values: Array<string | null | undefined>): string[] =>
  Array.from(new Set(values.filter((value): value is string => !!value)));

export const getFilterOptions = (snippets: ICodeSnippet[]) => ({
  creationPlaces: uniqueValues(snippets.map((snippet) => snippet.addedFrom)),
  programmingLanguages: uniqueValues(snippets.map((snippet) => snippet.programmingLanguage)),
  types: uniqueValues(snippets.map((snippet) => snippet.type)),
});
