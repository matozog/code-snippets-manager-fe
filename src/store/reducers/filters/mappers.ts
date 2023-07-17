import { ICodeSnippet } from 'src/types/models';
import { IFiltersData } from './reducer';
import { SORT_BY_OPTIONS } from './constants';
import { removeNonUniqueValuesFromArray } from 'src/utils/utils';

export const mapSnippetsDataToFiltersData = (codeSnippets: ICodeSnippet[]): IFiltersData => ({
  creationPlaces: removeNonUniqueValuesFromArray(codeSnippets.map((cs) => cs.addedFrom)),
  programmingLanguages: removeNonUniqueValuesFromArray(codeSnippets.map((cs) => cs.programmingLanguage)),
  sortByOptions: SORT_BY_OPTIONS,
  types: removeNonUniqueValuesFromArray(codeSnippets.map((cs) => cs.type)),
});
