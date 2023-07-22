import { FormControlLabel, Switch, useTheme } from '@mui/material';
import {
  NewSnippetTagsContainer,
  NewTagControls,
  SnippetAttributesContainer,
  SnippetAttributesWrapper,
  SnippetTags,
} from './snippet-attributes.jss';

import CustomDivider from 'src/components/custom-divider/custom-divider';
import Input from 'src/components/input/input';
import MuiButton from 'src/components/buttons/button';
import MuiChip from 'src/components/chip/chip';
import MuiPaper from 'src/components/paper/mui-paper';
import TextArea from 'src/components/text-area/text-area';
import { useState } from 'react';

const SnippetAttributes = () => {
  const theme = useTheme();
  const [snippetName, setSnippetName] = useState<string>('');
  const [newTag, setNewTag] = useState('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string[]>(['js', 'function', 'long tag']);

  const handleClickAddNewTag = () => {
    setTags([...tags, newTag]);
    setNewTag('');
  };

  return (
    <SnippetAttributesWrapper>
      <MuiPaper elevation={2} style={{ padding: theme.spacing(2) }}>
        <SnippetAttributesContainer>
          <Input label="Name" value={snippetName} onChange={(event: any) => setSnippetName(event.target.value)} />
          <Input
            label="Programming language"
            value={snippetName}
            onChange={(event: any) => setSnippetName(event.target.value)}
          />
          <Input label="Type" value={snippetName} onChange={(event: any) => setSnippetName(event.target.value)} />
          <Input
            label="Creation place"
            value={snippetName}
            onChange={(event: any) => setSnippetName(event.target.value)}
          />
          <TextArea
            placeholder="Description"
            value={description}
            onChange={(event: any) => setDescription(event.target.value)}
          />
          <FormControlLabel control={<Switch defaultChecked />} label="Favourite:" />
        </SnippetAttributesContainer>
        <CustomDivider />
        <SnippetTags>
          <NewTagControls>
            <Input label="New tag" value={newTag} onChange={(event: any) => setNewTag(event.target.value)} />
            <MuiButton text="Add" variant="contained" onClick={handleClickAddNewTag} />
          </NewTagControls>
          <NewSnippetTagsContainer>
            {tags.map((tag) => (
              <MuiChip key={tag} name={`# ${tag}`} />
            ))}
          </NewSnippetTagsContainer>
        </SnippetTags>
      </MuiPaper>
    </SnippetAttributesWrapper>
  );
};

export default SnippetAttributes;
