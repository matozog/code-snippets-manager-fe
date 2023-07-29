import React, { FC, MutableRefObject, useRef } from 'react';
import {
  SnippetCardContainer,
  SnippetCode,
  SnippetContent,
  SnippetContentOverflow,
  SnippetDescription,
  SnippetImageContainer,
  SnippetInfoContainer,
  SnippetProperties,
  SnippetTitle,
  TagsChipContainer,
  TagsContainer,
} from './snippet-card.content.jss';

import { Box } from '@mui/material';
import CustomDivider from 'src/components/custom-divider/custom-divider';
import { ICodeSnippet } from 'src/types/models';
import MuiChip from 'src/components/chip/chip';
import ReadMoreButton from 'src/components/buttons/read-more/read-more';
import { useIsOverflow } from 'src/hooks/useOverflow';

interface ISnippetCardContentProps {
  codeSnippet: ICodeSnippet | null;
  onClickReadMoreButton?: (codeSnippet: ICodeSnippet | null) => void;
}

const SnippetCardContent: FC<ISnippetCardContentProps> = ({ codeSnippet, onClickReadMoreButton }) => {
  const contentRef: MutableRefObject<HTMLDivElement | undefined> = useRef();
  const tagsRef: MutableRefObject<HTMLDivElement | undefined> = useRef();

  const { isOverflow: isOverflowContent } = useIsOverflow(contentRef);
  const { isHorizontalOverflow: isOverflowTags } = useIsOverflow(tagsRef);

  const handleOnClickReadMoreButton = () => {
    onClickReadMoreButton?.(codeSnippet);
  };

  if (!codeSnippet) return null;

  return (
    <SnippetCardContainer>
      <SnippetInfoContainer>
        <SnippetProperties>
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
          <SnippetDescription>
            <SnippetTitle>{codeSnippet.name}</SnippetTitle>
            <CustomDivider />
          </SnippetDescription>
        </SnippetProperties>
        <SnippetCode ref={contentRef}>
          {isOverflowContent && (
            <SnippetContentOverflow>
              <ReadMoreButton onClick={handleOnClickReadMoreButton} />
            </SnippetContentOverflow>
          )}
          <SnippetContent>{codeSnippet.content}</SnippetContent>
        </SnippetCode>
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

export default SnippetCardContent;
