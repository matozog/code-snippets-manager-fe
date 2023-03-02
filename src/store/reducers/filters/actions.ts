import { REQUEST } from 'src/store/config/constants';
import types from './types';

const changeSortBy = (sortBy: string) => ({
  type: REQUEST(types.CHANGE_SORT_BY),
  meta: {
    data: sortBy,
  },
});

export { changeSortBy };
