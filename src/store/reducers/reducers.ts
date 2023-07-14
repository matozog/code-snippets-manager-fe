import { combineReducers } from 'redux';
import snippetsData from './snippets/reducer';
import snippetsFilters from './filters/reducer';

export default combineReducers({
  snippetsFilters,
  snippetsData,
});
