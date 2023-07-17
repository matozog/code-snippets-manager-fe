import dayjs, { Dayjs } from 'dayjs';

import { ICodeSnippet } from 'src/types/models';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const existInArray = (value: string, array: string[]) =>
  value && value !== '' && array.length > 0 ? array.includes(value) : true;

const isBetweenDates = (value: string, minDate: Dayjs | null, maxDate: Dayjs | null) =>
  dayjs(value).isBetween(minDate, maxDate, 'day', '[]');

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
