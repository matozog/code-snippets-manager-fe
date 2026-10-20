import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TSnackbarSeverity } from 'src/components/snackbar/snackbar';

export interface INotifyProperties {
  isOpen: boolean;
  type: TSnackbarSeverity;
  message: string;
}

interface ICommonState {
  notifyProps: INotifyProperties;
}

const initialState: ICommonState = {
  notifyProps: {
    isOpen: false,
    type: 'success',
    message: '',
  },
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<Omit<INotifyProperties, 'isOpen'>>) => {
      state.notifyProps = { ...action.payload, isOpen: true };
    },
    hideNotification: (state) => {
      state.notifyProps.isOpen = false;
    },
  },
});

export const { showNotification, hideNotification } = commonSlice.actions;

export default commonSlice.reducer;
