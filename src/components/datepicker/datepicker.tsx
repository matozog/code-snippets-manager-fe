import { CustomDatepicker } from './datepicker.jss';
import { Dayjs } from 'dayjs';
import { FC } from 'react';

interface IDatepicker {
  label: string;
  onChange: (newValue: Dayjs | null) => void;
  value: Dayjs | undefined;
  maxDate?: Dayjs | undefined;
  minDate?: Dayjs | undefined;
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
