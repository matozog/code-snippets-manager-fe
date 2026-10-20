import { ICodeSnippet, defaultCodeSnippet } from 'src/types/models';
import { ISnippetFilterCriteria, filterSnippets, getFilterOptions, sortRecords } from './utils';

const noFilters: ISnippetFilterCriteria = {
  keyword: '',
  programmingLanguage: [],
  type: [],
  creationPlace: [],
  addedAfter: null,
  addedBefore: null,
  favourite: false,
};

const snippet = (fields: Partial<ICodeSnippet>): ICodeSnippet => ({ ...defaultCodeSnippet, ...fields });

describe('filterSnippets by added date', () => {
  // midday timestamps, so the local calendar day is the same in every time zone the tests run in
  const snippets = ['2026-10-01T10:00:00Z', '2026-10-10T12:00:00Z', '2026-10-20T11:30:00Z'].map((addedDate, index) =>
    snippet({ idSnippet: index, name: addedDate.slice(0, 10), addedDate }),
  );

  const filterByDates = (addedAfter: string | null, addedBefore: string | null) =>
    filterSnippets(snippets, { ...noFilters, addedAfter, addedBefore }).map((s) => s.name);

  test('min date only keeps snippets added on or after it', () => {
    expect(filterByDates('2026-10-10', null)).toEqual(['2026-10-10', '2026-10-20']);
  });

  test('max date only keeps snippets added on or before it', () => {
    expect(filterByDates(null, '2026-10-10')).toEqual(['2026-10-01', '2026-10-10']);
  });

  test('both dates keep snippets within the inclusive range', () => {
    expect(filterByDates('2026-10-05', '2026-10-15')).toEqual(['2026-10-10']);
  });
});

describe('filterSnippets by attributes', () => {
  const snippets = [
    snippet({ idSnippet: 1, name: 'Debounce', programmingLanguage: 'javascript', type: 'Function', favorite: true }),
    snippet({ idSnippet: 2, name: 'Throttle', programmingLanguage: 'typescript', type: 'Function' }),
    snippet({ idSnippet: 3, name: 'Docker cleanup', programmingLanguage: null, type: 'Script' }),
  ];
  const names = (criteria: Partial<ISnippetFilterCriteria>) =>
    filterSnippets(snippets, { ...noFilters, ...criteria }).map((s) => s.name);

  test('keyword matches names case-insensitively', () => {
    expect(names({ keyword: ' DE ' })).toEqual(['Debounce']);
  });

  test('selected values must match, empty selection matches everything', () => {
    expect(names({ programmingLanguage: ['typescript'] })).toEqual(['Throttle']);
    expect(names({ type: ['Function'], favourite: true })).toEqual(['Debounce']);
    expect(names({})).toHaveLength(3);
  });

  test('snippets without a value do not match a selection', () => {
    expect(names({ programmingLanguage: ['javascript', 'typescript'] })).toEqual(['Debounce', 'Throttle']);
  });
});

describe('sortRecords', () => {
  const snippets = [
    snippet({ idSnippet: 1, name: 'b', programmingLanguage: null, favorite: false }),
    snippet({ idSnippet: 2, name: 'a', programmingLanguage: 'rust', favorite: true }),
    snippet({ idSnippet: 3, name: 'c', programmingLanguage: 'go', favorite: false }),
  ];
  const ids = (sorted: ICodeSnippet[]) => sorted.map((s) => s.idSnippet);

  test('sorts by text in both directions without mutating the input', () => {
    expect(ids(sortRecords(snippets, 'name', true))).toEqual([2, 1, 3]);
    expect(ids(sortRecords(snippets, 'name', false))).toEqual([3, 1, 2]);
    expect(ids(snippets)).toEqual([1, 2, 3]);
  });

  test('keeps snippets without a value last in both directions', () => {
    expect(ids(sortRecords(snippets, 'programmingLanguage', true))).toEqual([3, 2, 1]);
    expect(ids(sortRecords(snippets, 'programmingLanguage', false))).toEqual([2, 3, 1]);
  });

  test('ascending order puts favourites first', () => {
    expect(ids(sortRecords(snippets, 'favorite', true))[0]).toBe(2);
    expect(ids(sortRecords(snippets, 'favorite', false))[2]).toBe(2);
  });

  test('returns the same list when sorting is not selected', () => {
    expect(sortRecords(snippets, '', true)).toBe(snippets);
  });
});

test('getFilterOptions returns unique non-empty values', () => {
  const options = getFilterOptions([
    snippet({ addedFrom: 'Work', programmingLanguage: 'js', type: '' }),
    snippet({ addedFrom: 'Work', programmingLanguage: null, type: 'Hook' }),
  ]);

  expect(options).toEqual({ creationPlaces: ['Work'], programmingLanguages: ['js'], types: ['Hook'] });
});
