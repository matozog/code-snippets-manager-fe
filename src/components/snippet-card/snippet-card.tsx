import { FC } from 'react';
import { ICodeSnippet } from 'src/types/models';
import MuiPaper from '../paper/mui-paper';
import SnippetCardContent from './content/snippet-card.content';
import { SnippetCardWrapper } from './snippet-card.jss';

interface ISnippetCardProps {
  codeSnippet: ICodeSnippet;
  onClickReadMoreButton?: (codeSnippet: ICodeSnippet | null) => void;
}

const SnippetCard: FC<ISnippetCardProps> = ({ codeSnippet, onClickReadMoreButton }) => {
  return (
    <SnippetCardWrapper>
      <MuiPaper elevation={8} style={{ height: '100%' }}>
        <SnippetCardContent codeSnippet={codeSnippet} onClickReadMoreButton={onClickReadMoreButton} />
      </MuiPaper>
    </SnippetCardWrapper>
  );
};

export default SnippetCard;
