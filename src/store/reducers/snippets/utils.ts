import dayjs, { Dayjs } from 'dayjs';

import { ICodeSnippet } from 'src/types/models';
import { SortByType } from '../filters/constants';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const existInArray = (value: string, array: string[]) =>
  value && value !== '' && array.length > 0 ? array.includes(value) : true;

const isBetweenDates = (value: string, minDate: Dayjs | null, maxDate: Dayjs | null) =>
  dayjs(value).isBetween(minDate, maxDate, 'day', '[]');

export const filterByKeyword = (snippets: Array<ICodeSnippet>, keyword: string): Array<ICodeSnippet> =>
  snippets.filter((snippet) => snippet.name.includes(keyword));

export const filterSnippets = (
  snippets: Array<ICodeSnippet>,
  programmingLanguages: Array<string>,
  types: Array<string>,
  creationPlaces: Array<string>,
  addedAfter: Dayjs | null,
  addedBefore: Dayjs | null,
  favourite: boolean
): Array<ICodeSnippet> =>
  snippets.filter((snippet) => {
    const { programmingLanguage, type, addedFrom, addedDate, isFavourite } = snippet;

    return (
      existInArray(programmingLanguage, programmingLanguages) &&
      existInArray(type, types) &&
      existInArray(addedFrom, creationPlaces) &&
      isBetweenDates(addedDate, addedBefore, addedAfter) &&
      (favourite ? isFavourite : true)
    );
  });

const comparatorFunc = (
  firstElement: string | boolean | null,
  secondElement: string | boolean | null,
  sortAsc: boolean
): number => {
  if (firstElement === null || secondElement === null) return -1;

  if (typeof firstElement === 'string' && typeof secondElement === 'string') {
    return sortAsc ? firstElement.localeCompare(secondElement) : secondElement.localeCompare(firstElement);
  } else if (typeof firstElement === 'boolean')
    return sortAsc ? Number(secondElement) - Number(firstElement) : Number(firstElement) - Number(secondElement);

  return 0;
};

export const sortRecords = (
  snippets: Array<ICodeSnippet>,
  sortBy: SortByType,
  sortAsc: boolean
): Array<ICodeSnippet> => {
  if (sortBy === '') return snippets;
  return [...snippets.sort((a: ICodeSnippet, b: ICodeSnippet) => comparatorFunc(a[sortBy], b[sortBy], sortAsc))];
};
