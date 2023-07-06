import { CustomDatepicker } from './datepicker.jss';
import { FC } from 'react';

interface IDatepicker {
  label: string;
}

const Datepicker: FC<IDatepicker> = ({ label }) => {
  return <CustomDatepicker label={label} format="DD/MM/YYYY" />;
};

export default Datepicker;
