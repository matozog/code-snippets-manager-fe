import { FC, MutableRefObject, useRef } from 'react';
import {
  SnippetCardContainer,
  SnippetContent,
  SnippetContentOverflow,
  SnippetDescription,
  SnippetImageContainer,
  SnippetInfoContainer,
  SnippetTitle,
  TagsChipContainer,
  TagsContainer,
} from './snippet-card.jss';

import { Box } from '@mui/material';
import CustomDivider from '../custom-divider/custom-divider';
import { ICodeSnippet } from 'src/types/models';
import MuiChip from '../chip/chip';
import ReadMoreButton from '../buttons/read-more/read-more';
import { useIsOverflow } from 'src/hooks/useOverflow';

interface ISnippetCardProps {
  codeSnippet: ICodeSnippet;
}

const SnippetCard: FC<ISnippetCardProps> = ({ codeSnippet }) => {
  const contentRef: MutableRefObject<HTMLDivElement | undefined> = useRef();
  const tagsRef: MutableRefObject<HTMLDivElement | undefined> = useRef();
  const { isOverflow: isOverflowContent } = useIsOverflow(contentRef);
  const { isHorizontalOverflow: isOverflowTags } = useIsOverflow(tagsRef);

  return (
    <SnippetCardContainer>
      <SnippetInfoContainer>
        {codeSnippet?.img && (
          <SnippetImageContainer>
            <Box
              component="img"
              sx={{
                objectFit: 'fill',
                height: 96,
                width: 96,
                maxHeight: { xs: 64, md: 120 },
                maxWidth: { xs: 64, md: 120 },
              }}
              src={codeSnippet?.img}
            />
          </SnippetImageContainer>
        )}
        <SnippetDescription ref={contentRef}>
          <SnippetTitle>{codeSnippet.name}</SnippetTitle>
          <CustomDivider />
          {isOverflowContent && (
            <SnippetContentOverflow>
              <ReadMoreButton />
            </SnippetContentOverflow>
          )}
          <SnippetContent>{codeSnippet.content}</SnippetContent>
        </SnippetDescription>
      </SnippetInfoContainer>
      <CustomDivider />
      <TagsContainer ref={tagsRef}>
        <TagsChipContainer isOverflow={isOverflowTags}>
          {codeSnippet.tags.map((tag) => (
            <MuiChip key={tag.name} name={`# ${tag.name}`} />
          ))}
        </TagsChipContainer>
        {/* {isOverflowTags && <TooltipInfo />} */}
      </TagsContainer>
    </SnippetCardContainer>
  );
};

export default SnippetCard;
