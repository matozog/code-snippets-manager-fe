import CodeEditor from 'src/components/code-editor/code-editor';
import MuiPaper from 'src/components/paper/mui-paper';
import { SnippetContentContainer } from './snippet-content.jss';
import { FormikValues, useFormik } from 'formik';
import { ICodeSnippet } from 'src/types/models';

interface ISnippetContentProps<K extends FormikValues> {
  formikProps: ReturnType<typeof useFormik<K>>;
}

const SnippetContent = <K extends FormikValues>({ formikProps }: ISnippetContentProps<K>) => {
  const { values, setFieldValue } = formikProps || {};
  const { content, programmingLanguage } = (values as unknown as ICodeSnippet) || {};
  const handleOnContentChange = (codeValue: string) => {
    setFieldValue('content', codeValue);
  };

  return (
    <SnippetContentContainer>
      <MuiPaper elevation={2}>
        <CodeEditor
          id="content"
          code={content}
          onValueChange={handleOnContentChange}
          language={programmingLanguage || 'js'}
        />
      </MuiPaper>
    </SnippetContentContainer>
  );
};

export default SnippetContent;
