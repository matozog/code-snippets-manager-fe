import { ChangeEvent, FC } from 'react';

import CodeEditor from '@uiw/react-textarea-code-editor';

interface ICodeEditorProps {
  code: string;
  onValueChange: (codeValue: string) => void;
  id?: string;
  language?: string;
}

const CustomCodeEditor: FC<ICodeEditorProps> = ({ code, onValueChange, id, language }) => {
  return (
    <CodeEditor
      id={id}
      value={code}
      language={language}
      placeholder={`Please enter ${language} code here.`}
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
