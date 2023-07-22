import { ChangeEvent, FC } from 'react';

import { StyledTextArea } from './text-area.jss';

interface ITextAreaProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  minRows?: number;
}

const TextArea: FC<ITextAreaProps> = ({ placeholder, minRows = 3, value, onChange }) => {
  return <StyledTextArea placeholder={placeholder} minRows={minRows} value={value} onChange={onChange} />;
};

export default TextArea;
