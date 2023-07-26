import { ChangeEvent, FC } from 'react';

import CodeEditor from '@uiw/react-textarea-code-editor';

interface ICodeEditorProps {
  code: string;
  onValueChange: (codeValue: string) => void;
  id?: string;
}

const CustomCodeEditor: FC<ICodeEditorProps> = ({ code, onValueChange, id }) => {
  return (
    <CodeEditor
      id={id}
      value={code}
      language="js"
      placeholder="Please enter JS code."
      onChange={(evn: ChangeEvent<HTMLTextAreaElement>) => onValueChange(evn.target.value)}
      padding={15}
      style={{
        minHeight: '100px',
        fontSize: 12,
        height: '100%',
        backgroundColor: '#f5f5f5',
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />
  );
};

export default CustomCodeEditor;
