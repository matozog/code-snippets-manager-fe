import { combineReducers } from 'redux';
import common from './common/reducer';
import snippetsData from './snippets/reducer';
import snippetsFilters from './filters/reducer';

export default combineReducers({
  common,
  snippetsData,
  snippetsFilters,
});
