import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'src/store/reducers/reducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
