import { Dayjs } from 'dayjs';
import { ICodeSnippet } from 'src/types/models';
import { mapSnippetsDataToFiltersData } from './mappers';
import types from './types';

const updateFiltersData = (snippetsData: ICodeSnippet[]) => ({
  type: types.UPDATE_FILTERS_DATA,
  meta: {
    data: mapSnippetsDataToFiltersData(snippetsData),
  },
});

const changeFiltersField = (fieldKey: string, value: string | string[] | boolean) => ({
  type: types.CHANGE_FILTERS_FIELD,
  meta: {
    data: {
      fieldKey,
      value,
    },
  },
});

const changeCalendarFilterField = (fieldKey: string, value: Dayjs | null) => ({
  type: types.CHANGE_FILTERS_FIELD,
  meta: {
    data: {
      fieldKey,
      value,
    },
  },
});

export { changeFiltersField, updateFiltersData, changeCalendarFilterField };
