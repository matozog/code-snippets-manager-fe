import { CSSProperties, ChangeEvent, FC, Ref } from 'react';

import CodeEditor from '@uiw/react-textarea-code-editor';

interface ICodeEditorProps {
  code: string;
  onValueChange?: (codeValue: string) => void;
  id?: string;
  language?: string;
  editable?: boolean;
  styles?: CSSProperties;
  ref?: Ref<HTMLTextAreaElement>;
}

const CustomCodeEditor: FC<ICodeEditorProps> = ({
  code,
  onValueChange,
  id,
  language,
  editable = true,
  styles,
  ref,
}) => {
  return (
    <CodeEditor
      ref={ref}
      readOnly={!editable}
      id={id}
      value={code}
      language={language}
      placeholder={`Please enter ${language} code here.`}
      onChange={(evn: ChangeEvent<HTMLTextAreaElement>) => onValueChange?.(evn.target.value)}
      padding={15}
      style={{
        overflow: 'auto',
        minHeight: '100px',
        fontSize: 15,
        height: '100%',
        width: '100%',
        backgroundColor: '#f5f5f5',
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        ...styles,
      }}
    />
  );
};

export default CustomCodeEditor;
