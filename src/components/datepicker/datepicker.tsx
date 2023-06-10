import { CustomDatepicker } from './datepicker.jss';
import { FC } from 'react';

interface IDatepicker {
  label: string;
}

const Datepicker: FC<IDatepicker> = ({ label }) => {
  return <CustomDatepicker label={label} />;
};

export default Datepicker;
