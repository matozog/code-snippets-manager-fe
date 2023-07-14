import { ICodeSnippet } from 'src/types/models';
import { REQUEST } from 'src/store/config/constants';
import { mapSnippetsDataToFiltersData } from './mappers';
import types from './types';

const updateFiltersData = (snippetsData: ICodeSnippet[]) => ({
  type: types.UPDATE_FILTERS_DATA,
  meta: {
    data: mapSnippetsDataToFiltersData(snippetsData),
  },
});

const changeSortBy = (sortBy: string) => ({
  type: REQUEST(types.CHANGE_SORT_BY),
  meta: {
    data: sortBy,
  },
});

export { changeSortBy, updateFiltersData };
