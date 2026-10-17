export type SortByType = 'name' | 'programmingLanguage' | 'favorite' | 'type' | 'addedFrom' | 'addedDate' | '';

export const SORT_BY_OPTIONS: Map<SortByType, string> = new Map([
  ['name', 'Name'],
  ['programmingLanguage', 'Programming language'],
  ['favorite', 'Favourite'],
  ['type', 'Type'],
  ['addedFrom', 'Added from'],
  ['addedDate', 'Added date'],
]);
