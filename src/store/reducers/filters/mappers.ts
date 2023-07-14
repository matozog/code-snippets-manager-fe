import { ICodeSnippet } from 'src/types/models';
import { IFiltersData } from './reducer';
import { removeNonUniqueValuesFromArray } from 'src/utils/utils';

export const mapSnippetsDataToFiltersData = (codeSnippets: ICodeSnippet[]): IFiltersData => ({
  creationPlaces: removeNonUniqueValuesFromArray(codeSnippets.map((cs) => cs.addedFrom)),
  programmingLanguages: removeNonUniqueValuesFromArray(codeSnippets.map((cs) => cs.programmingLanguage)),
  sortByOptions: codeSnippets && codeSnippets[0] ? Object.keys(codeSnippets[0]) : [],
  types: removeNonUniqueValuesFromArray(codeSnippets.map((cs) => cs.type)),
});
