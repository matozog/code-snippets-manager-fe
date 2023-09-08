import * as snippetsDuck from 'src/store/reducers/snippets';

import { IRootState, useAppDispatch } from 'src/store/config/store';
import { useNavigate, useParams } from 'react-router-dom';

import { ICodeSnippet } from 'src/types/models';
import SnippetPage from '../snippet-page/snippet-page';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const EditSnippet = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const codeSnippet = useSelector((state: IRootState) => state.snippetsData.snippet);

  const handleOnClickBackButton = () => navigate('/');

  const handleOnClickSave = (values: ICodeSnippet) => {
    id &&
      dispatch(
        snippetsDuck.operations.updateSnippet(
          {
            ...values,
            addedDate: codeSnippet.addedDate || new Date().toDateString(),
            idSnippet: codeSnippet.idSnippet || Date.now().toString(),
            tags: values.tags.map((tag) => ({ ...tag, addedDate: Date.now().toString() })),
          },
          handleOnClickBackButton,
          id
        )
      );
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    id && dispatch(snippetsDuck.operations.fetchSnippet(id));

    return () => {
      dispatch(snippetsDuck.operations.clearCodeSnippet());
    };
  }, []);

  return <SnippetPage codeSnippet={codeSnippet} onClickSave={handleOnClickSave} />;
};

export default EditSnippet;
