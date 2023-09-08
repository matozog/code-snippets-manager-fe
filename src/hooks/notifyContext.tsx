import { FC, PropsWithChildren, createContext, useState } from 'react';

import { TSnackbarSeverity } from 'src/components/snackbar/snackbar';

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

export interface INotifyService {
  notifyProperties: INotifyProperties;
  setNotifyProperties: (value: INotifyProperties) => void;
}

export const NotifyContext = createContext({} as INotifyService);

const NotifyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notifyProperties, setNotifyProperties] = useState(defaultNotifyProperties);

  return <NotifyContext.Provider value={{ notifyProperties, setNotifyProperties }}>{children}</NotifyContext.Provider>;
};

export default NotifyProvider;
