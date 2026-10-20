import { ICodeSnippet, defaultCodeSnippet } from 'src/types/models';

import SnippetPage from '../snippet-page/snippet-page';
import { addNewSnippet } from 'src/store/reducers/snippets/snippets.thunks';
import { useAppDispatch } from 'src/store/config/store';
import { useNavigate } from 'react-router';

const NewSnippet = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnClickSave = async (values: ICodeSnippet) => {
    const result = await dispatch(addNewSnippet(values));
    if (addNewSnippet.fulfilled.match(result)) navigate('/');
  };

  return <SnippetPage codeSnippet={defaultCodeSnippet} onClickSave={handleOnClickSave} />;
};

export default NewSnippet;
