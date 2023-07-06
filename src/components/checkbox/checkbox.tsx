import { CheckboxLabel, MuiCheckboxComp, MuiCheckboxContainer } from './checkbox.jss';

import { FC } from 'react';

interface IMuiCheckboxProps {
  label: string;
}

const MuiCheckbox: FC<IMuiCheckboxProps> = ({ label }) => {
  return (
    <MuiCheckboxContainer>
      <CheckboxLabel>{label}</CheckboxLabel>
      <MuiCheckboxComp />
    </MuiCheckboxContainer>
  );
};

export default MuiCheckbox;
