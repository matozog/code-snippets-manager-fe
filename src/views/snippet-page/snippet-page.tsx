import * as yup from 'yup';

import { ICodeSnippet, defaultCodeSnippet } from 'src/types/models';
import { NewSnippetPageActions, NewSnippetPageContainer, NewSnippetPageWrapper } from './snippet-page.jss';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FC } from 'react';
import MuiButton from 'src/components/buttons/button';
import SnippetAttributes from './modules/snippet-attributes/snippet-attributes';
import SnippetContent from './modules/snippet-content/snippet-content';
import { useForm } from 'src/hooks/useForm';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  name: yup.string().required('Name is required.'),
  programmingLanguage: yup.string().required('Programming language is required.'),
  tags: yup.array().required('Minimum one tag is required.'),
});

interface ISnippetPageProps {
  codeSnippet?: ICodeSnippet;
  onClickSave?: (values: ICodeSnippet) => void;
}

const SnippetPage: FC<ISnippetPageProps> = ({ codeSnippet, onClickSave }) => {
  const navigate = useNavigate();

  const handleOnClickBackButton = () => {
    navigate('/');
  };

  const handleOnClickSave = (values: ICodeSnippet) => {
    onClickSave?.(values);
  };

  const { formikProps } = useForm<ICodeSnippet>(
    codeSnippet ? { ...codeSnippet } : defaultCodeSnippet,
    validationSchema,
    handleOnClickSave
  );
  const { handleSubmit } = formikProps || {};

  return (
    <NewSnippetPageWrapper>
      <form onSubmit={handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <NewSnippetPageActions>
          <MuiButton
            text="Back"
            variant="outlined"
            onClick={handleOnClickBackButton}
            icon={<ArrowBackIcon />}
            iconPlace="left"
          />
          <MuiButton text="Save" variant="contained" type="submit" />
        </NewSnippetPageActions>
        <NewSnippetPageContainer>
          <SnippetAttributes<ICodeSnippet> formikProps={formikProps} />
          <SnippetContent<ICodeSnippet> formikProps={formikProps} />
        </NewSnippetPageContainer>
      </form>
    </NewSnippetPageWrapper>
  );
};

export default SnippetPage;
