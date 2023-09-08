import * as snippetDuck from 'src/store/reducers/snippets';

import { ICodeSnippet, defaultCodeSnippet } from 'src/types/models';

import SnippetPage from '../snippet-page/snippet-page';
import { useAppDispatch } from 'src/store/config/store';
import { useNavigate } from 'react-router-dom';

const NewSnippet = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnClickBackButton = () => navigate('/');

  const handleOnClickSave = (values: ICodeSnippet) => {
    dispatch(
      snippetDuck.operations.addNewSnippet(
        {
          ...values,
          addedDate: new Date().toDateString(),
          idSnippet: Date.now().toString(),
          tags: values.tags.map((tag) => ({ ...tag, addedDate: Date.now().toString() })),
        },
        handleOnClickBackButton
      )
    );
  };

  return <SnippetPage codeSnippet={defaultCodeSnippet} onClickSave={handleOnClickSave} />;
};

export default NewSnippet;
