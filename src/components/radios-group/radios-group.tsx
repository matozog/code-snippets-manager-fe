import { FormControl, FormControlLabel } from '@mui/material';
import { StyledFormLabel, StyledRadioGroup } from './radios-group.jss';

import { FC } from 'react';
import RadioButton from '../buttons/radio/radio';

interface IRadiosGroupProps {
  radiosTitle: string;
}

const RadiosGroup: FC<IRadiosGroupProps> = ({ radiosTitle }) => {
  return (
    <FormControl>
      <StyledFormLabel id="demo-radio-buttons-group-label">{radiosTitle}</StyledFormLabel>
      <StyledRadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<RadioButton value="female" />} label="Ascending" />
        <FormControlLabel value="male" control={<RadioButton value="male" />} label="Descending" />
      </StyledRadioGroup>
    </FormControl>
  );
};

export default RadiosGroup;
