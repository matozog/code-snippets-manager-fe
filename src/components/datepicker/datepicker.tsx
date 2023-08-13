import { CustomDatepicker } from './datepicker.jss';
import { Dayjs } from 'dayjs';
import { FC } from 'react';

interface IDatepicker {
  label: string;
  onChange: (newValue: any) => void;
  value: Dayjs | null;
  maxDate?: Dayjs | null;
  minDate?: Dayjs | null;
}

const Datepicker: FC<IDatepicker> = ({ label, value, onChange, maxDate, minDate }) => {
  return (
    <CustomDatepicker
      label={label}
      format="DD/MM/YYYY"
      onChange={onChange}
      value={value}
      maxDate={maxDate}
      minDate={minDate}
    />
  );
};

export default Datepicker;
