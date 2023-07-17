import { CheckboxLabel, MuiCheckboxComp, MuiCheckboxContainer } from './checkbox.jss';

import { FC } from 'react';

interface IMuiCheckboxProps {
  label: string;
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const MuiCheckbox: FC<IMuiCheckboxProps> = ({ label, value, onChange }) => {
  return (
    <MuiCheckboxContainer>
      <CheckboxLabel>{label}</CheckboxLabel>
      <MuiCheckboxComp onChange={onChange} checked={value} />
    </MuiCheckboxContainer>
  );
};

export default MuiCheckbox;
