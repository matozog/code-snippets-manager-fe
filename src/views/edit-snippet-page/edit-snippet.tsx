import { fetchSnippet, updateSnippet } from 'src/store/reducers/snippets/snippets.thunks';
import { useAppDispatch, useAppSelector } from 'src/store/config/store';
import { useNavigate, useParams } from 'react-router';

import { ICodeSnippet } from 'src/types/models';
import SnippetPage from '../snippet-page/snippet-page';
import { clearCodeSnippet } from 'src/store/reducers/snippets/snippets.slice';
import { useEffect } from 'react';

const EditSnippet = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = Number(useParams().id);
  const codeSnippet = useAppSelector((state) => state.snippetsData.snippet);

  const handleOnClickSave = async (values: ICodeSnippet) => {
    const result = await dispatch(updateSnippet({ id, snippet: values }));
    if (updateSnippet.fulfilled.match(result)) navigate('/');
  };

  useEffect(() => {
    if (Number.isInteger(id)) dispatch(fetchSnippet(id));

    return () => {
      dispatch(clearCodeSnippet());
    };
  }, [dispatch, id]);

  return <SnippetPage codeSnippet={codeSnippet} onClickSave={handleOnClickSave} />;
};

export default EditSnippet;
