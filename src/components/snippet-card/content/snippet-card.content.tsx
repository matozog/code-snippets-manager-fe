import { CSSProperties, FC, MutableRefObject, Ref, useRef } from 'react';
import {
  SnippetCardContainer,
  SnippetCode,
  SnippetContentOverflow,
  SnippetDescription,
  SnippetDetail,
  SnippetDetailLabel,
  SnippetDetailValue,
  SnippetDetails,
  SnippetImageContainer,
  SnippetInfoContainer,
  SnippetProperties,
  SnippetTitle,
  TagsChipContainer,
  TagsContainer,
} from './snippet-card.content.jss';

import { Box } from '@mui/material';
import CustomCodeEditor from 'src/components/code-editor/code-editor';
import CustomDivider from 'src/components/custom-divider/custom-divider';
import { ICodeSnippet } from 'src/types/models';
import MuiChip from 'src/components/chip/chip';
import ReadMoreButton from 'src/components/buttons/read-more/read-more';
import { useIsOverflow } from 'src/hooks/useOverflow';

interface ISnippetCardContentProps {
  codeSnippet: ICodeSnippet | null;
  onClickReadMoreButton?: (codeSnippet: ICodeSnippet | null) => void;
  withReadmore?: boolean;
  editorStyles?: CSSProperties;
}

const SnippetCardContent: FC<ISnippetCardContentProps> = ({
  codeSnippet,
  onClickReadMoreButton,
  withReadmore = false,
  editorStyles,
}) => {
  const contentRef: Ref<HTMLTextAreaElement | undefined> = useRef();
  const tagsRef: MutableRefObject<HTMLDivElement | undefined> = useRef();

  const { isOverflow: isOverflowContent } = useIsOverflow(contentRef);
  const { isHorizontalOverflow: isOverflowTags } = useIsOverflow(tagsRef);

  const handleOnClickReadMoreButton = () => {
    onClickReadMoreButton?.(codeSnippet);
  };

  if (!codeSnippet) return null;

  const { programmingLanguage, type, name, content, tags, img } = codeSnippet || {};

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
                  marginRight: 8,
                  // maxHeight: { xs: 64, md: 120 },
                  // maxWidth: { xs: 64, md: 120 },
                }}
                src={img}
              />
            </SnippetImageContainer>
          )}
          <SnippetDescription>
            <SnippetTitle>{name}</SnippetTitle>
            <CustomDivider />
            <SnippetDetails>
              <SnippetDetail>
                <SnippetDetailLabel>Language:</SnippetDetailLabel>
                <SnippetDetailValue>{programmingLanguage}</SnippetDetailValue>
              </SnippetDetail>
              <SnippetDetail>
                <SnippetDetailLabel>Type:</SnippetDetailLabel>
                <SnippetDetailValue>{type}</SnippetDetailValue>
              </SnippetDetail>
            </SnippetDetails>
          </SnippetDescription>
        </SnippetProperties>
        <SnippetCode>
          {isOverflowContent && withReadmore && (
            <SnippetContentOverflow>
              <ReadMoreButton onClick={handleOnClickReadMoreButton} />
            </SnippetContentOverflow>
          )}
          {/* <SnippetContent>{codeSnippet.content}</SnippetContent> */}
          <CustomCodeEditor
            ref={contentRef}
            code={content}
            language={programmingLanguage || 'js'}
            editable={false}
            styles={{ overflow: 'hidden', ...editorStyles }}
          />
        </SnippetCode>
      </SnippetInfoContainer>
      <CustomDivider />
      <TagsContainer ref={tagsRef}>
        <TagsChipContainer isOverflow={isOverflowTags}>
          {tags.map((tag) => (
            <MuiChip key={tag.name} name={`# ${tag.name}`} />
          ))}
        </TagsChipContainer>
        {/* {isOverflowTags && <TooltipInfo />} */}
      </TagsContainer>
    </SnippetCardContainer>
  );
};

export default SnippetCardContent;
