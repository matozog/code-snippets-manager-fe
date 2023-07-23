import { ChangeEvent, FC } from 'react';

import { StyledTextArea } from './text-area.jss';

interface ITextAreaProps {
  id?: string;
  minRows?: number;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value: string;
}

const TextArea: FC<ITextAreaProps> = ({ placeholder, minRows = 3, value, onChange, id }) => {
  return <StyledTextArea placeholder={placeholder} minRows={minRows} value={value} onChange={onChange} id={id} />;
};

export default TextArea;
