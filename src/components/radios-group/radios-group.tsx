import { FormControl, FormControlLabel } from '@mui/material';
import { StyledFormLabel, StyledRadioGroup } from './radios-group.jss';

import { FC } from 'react';
import RadioButton from '../buttons/radio/radio';

interface IRadiosGroupProps {
  radiosTitle: string;
  options: Map<string, string>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadiosGroup: FC<IRadiosGroupProps> = ({ radiosTitle, options, onChange, value }) => {
  return (
    <FormControl>
      <StyledFormLabel id="demo-radio-buttons-group-label">{radiosTitle}</StyledFormLabel>
      <StyledRadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={onChange}
        value={value}
      >
        {Array.from(options).map(([key, value]) => (
          <FormControlLabel key={key} value={key} control={<RadioButton value={key} />} label={value} />
        ))}
      </StyledRadioGroup>
    </FormControl>
  );
};

export default RadiosGroup;
