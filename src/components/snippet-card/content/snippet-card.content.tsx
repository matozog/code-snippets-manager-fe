import { Box, useMediaQuery, useTheme } from '@mui/material';
import { CSSProperties, FC, MutableRefObject, useRef } from 'react';
import {
  CopySnippetButton,
  EditIconButton,
  RemoveSnippetButton,
  SnippetActionContainer,
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
  SnippetTitleContainer,
  TagsChipContainer,
  TagsContainer,
} from './snippet-card.content.jss';

import CustomCodeEditor from 'src/components/code-editor/code-editor';
import CustomDivider from 'src/components/custom-divider/custom-divider';
import { ICodeSnippet } from 'src/types/models';
import MuiChip from 'src/components/chip/chip';
import OptionsButton from 'src/components/buttons/options-button/options-button';
import ReadMoreButton from 'src/components/buttons/read-more/read-more';
import { useIsOverflow } from 'src/hooks/useOverflow';
import { useNavigate } from 'react-router-dom';

interface ISnippetCardContentProps {
  codeSnippet: ICodeSnippet | null;
  onClickReadMoreButton?: (codeSnippet: ICodeSnippet | null) => void;
  withReadmore?: boolean;
  editorStyles?: CSSProperties;
  onClickCopySnippet?: (content: string) => void;
  onClickRemoveSnippet?: (snippetId?: string) => void;
}

const SnippetCardContent: FC<ISnippetCardContentProps> = ({
  codeSnippet,
  onClickReadMoreButton,
  withReadmore = false,
  editorStyles,
  onClickCopySnippet,
  onClickRemoveSnippet,
}) => {
  const contentRef: MutableRefObject<HTMLTextAreaElement | null | undefined> = useRef();
  const tagsRef: MutableRefObject<HTMLDivElement | undefined> = useRef();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLowResolution = useMediaQuery(theme.breakpoints.down(400));
  const navigate = useNavigate();

  const { isOverflow: isOverflowContent } = useIsOverflow(contentRef);
  const { isHorizontalOverflow: isOverflowTags } = useIsOverflow(tagsRef);

  const handleOnClickReadMoreButton = () => {
    onClickReadMoreButton?.(codeSnippet);
  };

  if (!codeSnippet) return null;

  const { programmingLanguage, type, name, content, tags, img, idSnippet } = codeSnippet || {};

  return (
    <SnippetCardContainer>
      <SnippetInfoContainer withTags={tags.length > 0}>
        <SnippetProperties>
          {codeSnippet?.img && !isLowResolution && (
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
          <SnippetDescription isImage={!!codeSnippet?.img}>
            <SnippetTitleContainer>
              <SnippetTitle>{name}</SnippetTitle>
              {isMobile ? (
                <OptionsButton
                  isOpen
                  menuItemList={[
                    { text: 'Copy', onClick: () => onClickCopySnippet?.(content || '') },
                    { text: 'Edit', onClick: () => navigate(`edit-snippet/${idSnippet}`) },
                    { text: 'Delete', onClick: () => onClickRemoveSnippet?.(idSnippet) },
                  ]}
                />
              ) : (
                <SnippetActionContainer>
                  <CopySnippetButton onClick={() => onClickCopySnippet?.(content || '')} />
                  <EditIconButton onClick={() => navigate(`edit-snippet/${idSnippet}`)} />
                  <RemoveSnippetButton onClick={() => onClickRemoveSnippet?.(idSnippet)} />
                </SnippetActionContainer>
              )}
            </SnippetTitleContainer>
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
          <CustomCodeEditor
            ref={contentRef}
            code={content}
            language={programmingLanguage || 'js'}
            editable={false}
            styles={{ overflow: 'hidden', ...editorStyles }}
          />
        </SnippetCode>
      </SnippetInfoContainer>
      {tags.length > 0 && (
        <>
          <CustomDivider />
          <TagsContainer ref={tagsRef}>
            <TagsChipContainer isOverflow={isOverflowTags}>
              {tags.map((tag) => (
                <MuiChip key={tag.name} name={`# ${tag.name}`} />
              ))}
            </TagsChipContainer>
          </TagsContainer>
        </>
      )}
    </SnippetCardContainer>
  );
};

export default SnippetCardContent;
