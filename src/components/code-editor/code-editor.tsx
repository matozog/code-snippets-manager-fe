import CodeEditor from '@uiw/react-textarea-code-editor';
import { FC } from 'react';

interface ICodeEditorProps {
  code: string;
  onValueChange: (codeValue: string) => void;
}

const CustomCodeEditor: FC<ICodeEditorProps> = ({ code, onValueChange }) => {
  return (
    <CodeEditor
      value={code}
      language="js"
      placeholder="Please enter JS code."
      onChange={(evn: any) => onValueChange(evn.target.value)}
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
