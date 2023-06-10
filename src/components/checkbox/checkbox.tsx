import { Checkbox } from '@mui/material';
import { FC } from 'react';
import { MuiCheckboxContainer } from './checkbox.jss';

interface IMuiCheckbox {
  label: string;
}

const MuiCheckbox: FC<IMuiCheckbox> = ({ label }) => {
  return (
    <MuiCheckboxContainer>
      <span>{label}</span>
      <Checkbox />
    </MuiCheckboxContainer>
  );
};

export default MuiCheckbox;
