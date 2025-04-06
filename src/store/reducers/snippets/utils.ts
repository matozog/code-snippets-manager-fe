import dayjs, { Dayjs } from 'dayjs';

import { ICodeSnippet } from 'src/types/models';
import { SortByType } from '../filters/constants';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const existInArray = (value: string | null, array: string[]) =>
  value && value !== '' && array.length > 0 ? array.includes(value) : true;

const isBetweenDates = (value: string, minDate: Dayjs | undefined, maxDate: Dayjs | undefined) => {
  const hasMin = minDate != null;
  const hasMax = maxDate != null;

  const date = dayjs(value);

  if (hasMin && hasMax) {
    return date.isBetween(minDate, maxDate, 'day', '[]');
  } else if (hasMin) {
    return date.isAfter(minDate) || date.isSame(minDate, 'day');
  } else if (hasMax) {
    return date.isBefore(maxDate) || date.isSame(maxDate, 'day');
  }

  return true;
};

export const filterByKeyword = (snippets: Array<ICodeSnippet>, keyword: string): Array<ICodeSnippet> =>
  snippets.filter((snippet) => snippet.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));

export const filterSnippets = (
  snippets: Array<ICodeSnippet>,
  programmingLanguages: Array<string>,
  types: Array<string>,
  creationPlaces: Array<string>,
  addedAfter: Dayjs | undefined,
  addedBefore: Dayjs | undefined,
  favourite: boolean,
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
  sortAsc: boolean,
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
  sortAsc: boolean,
): Array<ICodeSnippet> => {
  if (sortBy === '') return snippets;
  return [...snippets.sort((a: ICodeSnippet, b: ICodeSnippet) => comparatorFunc(a[sortBy], b[sortBy], sortAsc))];
};
