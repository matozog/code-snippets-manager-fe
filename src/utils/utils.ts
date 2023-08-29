import { MutableRefObject } from 'react';

export const getUrl = () => 'url';

export const removeNonUniqueValuesFromArray = (arrayToModify: string[]): string[] =>
  Array.from(new Set(arrayToModify.filter((el) => el.length)));

export const scrollToTop = (elementToScroll?: MutableRefObject<HTMLElement | undefined>) => {
  elementToScroll?.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};
