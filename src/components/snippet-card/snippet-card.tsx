import { SnippetCardContainer, SnippetInfoContainer, TagsContainer } from './snippet-card.jss';

import CustomDivider from '../custom-divider/custom-divider';
import { FC } from 'react';
import { ICodeSnippet } from 'src/types/models';

interface ISnippetCardProps {
  codeSnippet: ICodeSnippet;
}

const SnippetCard: FC<ISnippetCardProps> = () => {
  return (
    <SnippetCardContainer>
      <SnippetInfoContainer>Snippet info</SnippetInfoContainer>
      <CustomDivider />
      <TagsContainer>Tags info</TagsContainer>
    </SnippetCardContainer>
  );
};

export default SnippetCard;
