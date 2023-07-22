import CodeEditor from 'src/components/code-editor/code-editor';
import MuiPaper from 'src/components/paper/mui-paper';
import { SnippetContentContainer } from './snippet-content.jss';
import { useState } from 'react';

const SnippetContent = () => {
  const [code, setCode] = useState('');
  const handleOnContentChange = (codeValue: string) => {
    setCode(codeValue);
  };

  return (
    <SnippetContentContainer>
      <MuiPaper elevation={2}>
        <CodeEditor code={code} onValueChange={handleOnContentChange} />
      </MuiPaper>
    </SnippetContentContainer>
  );
};

export default SnippetContent;
