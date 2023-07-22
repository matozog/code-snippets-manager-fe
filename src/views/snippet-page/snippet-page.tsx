import { NewSnippetPageActions, NewSnippetPageContainer, NewSnippetPageWrapper } from './snippet-page.jss';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MuiButton from 'src/components/buttons/button';
import SnippetAttributes from './modules/snippet-attributes/snippet-attributes';
import SnippetContent from './modules/snippet-content/snippet-content';
import { useNavigate } from 'react-router-dom';

const SnippetPage = () => {
  const navigate = useNavigate();

  const handleOnClickBackButton = () => {
    navigate('/');
  };

  const handleOnClickSave = () => {
    console.log('Save snipet');
  };

  return (
    <NewSnippetPageWrapper>
      <NewSnippetPageActions>
        <MuiButton
          text="Back to home page"
          onClick={handleOnClickBackButton}
          icon={<ArrowBackIcon />}
          iconPlace="left"
        />
        <MuiButton text="Save" variant="contained" onClick={handleOnClickSave} />
      </NewSnippetPageActions>
      <NewSnippetPageContainer>
        <SnippetAttributes />
        <SnippetContent />
      </NewSnippetPageContainer>
    </NewSnippetPageWrapper>
  );
};

export default SnippetPage;
