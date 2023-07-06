import Divider from '@mui/material/Divider';
import { FC } from 'react';

interface ICustomDividerProps {
  color?: string;
}

const CustomDivider: FC<ICustomDividerProps> = ({ color }) => {
  return <Divider color={color} />;
};

export default CustomDivider;
