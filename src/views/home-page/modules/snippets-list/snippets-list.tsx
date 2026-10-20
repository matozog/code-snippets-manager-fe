import { FC } from 'react';
import { ICodeSnippet } from 'src/types/models';
import SnippetCard from 'src/components/snippet-card/snippet-card';
import { SnippetsListContainer } from './snippet-list.jss';
import { selectVisibleSnippets } from 'src/store/reducers/snippets/selectors';
import { useAppSelector } from 'src/store/config/store';

interface ISnippetListProps {
  onClickSnippet?: (codeSnippet: ICodeSnippet | null) => void;
  onClickCopySnippet?: (content: string) => void;
  onClickRemoveSnippet?: (snippetId?: number) => void;
}

const SnippetsList: FC<ISnippetListProps> = ({ onClickSnippet, onClickRemoveSnippet, onClickCopySnippet }) => {
  const snippetsList = useAppSelector(selectVisibleSnippets);

  return (
    <SnippetsListContainer>
      {snippetsList.map((codeSnippet) => (
        <SnippetCard
          key={codeSnippet.idSnippet}
          codeSnippet={codeSnippet}
          onClickReadMoreButton={onClickSnippet}
          onClickCopySnippet={onClickCopySnippet}
          onClickRemoveSnippet={onClickRemoveSnippet}
        />
      ))}
    </SnippetsListContainer>
  );
};

export default SnippetsList;
