import { FC } from 'react';
import { ICodeSnippet } from 'src/types/models';
import MuiPaper from '../paper/mui-paper';
import SnippetCardContent from './content/snippet-card.content';
import { SnippetCardWrapper } from './snippet-card.jss';

interface ISnippetCardProps {
  codeSnippet: ICodeSnippet;
  onClickReadMoreButton?: (codeSnippet: ICodeSnippet | null) => void;
  onClickCopySnippet?: (content: string) => void;
  onClickRemoveSnippet?: (snippetId?: string) => void;
}

const SnippetCard: FC<ISnippetCardProps> = ({
  codeSnippet,
  onClickReadMoreButton,
  onClickCopySnippet,
  onClickRemoveSnippet,
}) => {
  return (
    <SnippetCardWrapper>
      <MuiPaper elevation={8} style={{ height: 'inherit' }}>
        <SnippetCardContent
          codeSnippet={codeSnippet}
          onClickReadMoreButton={onClickReadMoreButton}
          withReadmore
          onClickCopySnippet={onClickCopySnippet}
          onClickRemoveSnippet={onClickRemoveSnippet}
        />
      </MuiPaper>
    </SnippetCardWrapper>
  );
};

export default SnippetCard;
