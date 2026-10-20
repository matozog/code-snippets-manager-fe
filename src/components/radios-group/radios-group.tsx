import { FormControl, FormControlLabel } from '@mui/material';
import { StyledFormLabel, StyledRadioGroup } from './radios-group.jss';

import { FC, useId } from 'react';
import RadioButton from '../buttons/radio/radio';

interface IRadiosGroupProps {
  radiosTitle: string;
  options: Map<string, string>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadiosGroup: FC<IRadiosGroupProps> = ({ radiosTitle, options, onChange, value }) => {
  const labelId = useId();

  return (
    <FormControl>
      <StyledFormLabel id={labelId}>{radiosTitle}</StyledFormLabel>
      <StyledRadioGroup aria-labelledby={labelId} onChange={onChange} value={value}>
        {Array.from(options).map(([key, value]) => (
          <FormControlLabel key={key} value={key} control={<RadioButton value={key} />} label={value} />
        ))}
      </StyledRadioGroup>
    </FormControl>
  );
};

export default RadiosGroup;
