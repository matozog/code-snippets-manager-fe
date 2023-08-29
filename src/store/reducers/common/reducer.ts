import { TSnackbarSeverity } from 'src/components/snackbar/snackbar';
import { createSlice } from '@reduxjs/toolkit';

export interface INotifyProperties {
  isOpen: boolean;
  type: TSnackbarSeverity;
  message: string;
}

const defaultNotifyProperties: INotifyProperties = {
  isOpen: false,
  type: 'success',
  message: '',
};

const initialState = {
  notifyProps: defaultNotifyProperties,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setNotifyProperties: (state, action) => {
      state.notifyProps = action.payload;
    },
  },
});

export default commonSlice.reducer;
