import { ThunkAction, UnknownAction, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import rootReducer from 'src/store/reducers/reducers';

export const createAppStore = (preloadedState?: Partial<IRootState>) =>
  configureStore({ reducer: rootReducer, preloadedState });

const store = createAppStore();

export type IRootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createAppStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, UnknownAction>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<IRootState>();

export default store;
