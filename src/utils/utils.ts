export const getUrl = () => 'url';

export const removeNonUniqueValuesFromArray = (arrayToModify: string[]): string[] => Array.from(new Set(arrayToModify));

export const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};
