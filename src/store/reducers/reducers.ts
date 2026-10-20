import auth from './auth/auth.slice';
import { combineReducers } from '@reduxjs/toolkit';
import common from './common/common.slice';
import snippetsData from './snippets/snippets.slice';
import snippetsFilters from './filters/filters.slice';

export default combineReducers({
  auth,
  common,
  snippetsData,
  snippetsFilters,
});
