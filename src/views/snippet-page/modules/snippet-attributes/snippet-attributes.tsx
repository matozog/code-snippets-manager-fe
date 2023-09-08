import { ChangeEvent, useState } from 'react';
import { FormControlLabel, Switch, useTheme } from '@mui/material';
import {
  NewSnippetTagsContainer,
  NewTagControls,
  SnippetAttributesContainer,
  SnippetAttributesWrapper,
  SnippetTags,
} from './snippet-attributes.jss';

import CustomDivider from 'src/components/custom-divider/custom-divider';
import { ICodeSnippet, ITag } from 'src/types/models';
import Input from 'src/components/input/input';
import MuiButton from 'src/components/buttons/button';
import MuiChip from 'src/components/chip/chip';
import MuiPaper from 'src/components/paper/mui-paper';
import TextArea from 'src/components/text-area/text-area';
import { FormikValues, useFormik } from 'formik';
import MuiAutocomplete from 'src/components/autocomplete/autocomplete';
import { refractor } from 'refractor';

export interface ISnippetAttributes<K extends FormikValues> {
  formikProps?: ReturnType<typeof useFormik<K>>;
}

const SnippetAttributes = <K extends FormikValues>({ formikProps }: ISnippetAttributes<K>) => {
  const theme = useTheme();
  const [newTag, setNewTag] = useState('');

  const { handleChange, handleBlur, values, setFieldValue } = formikProps || {};
  const { name, programmingLanguage, addedFrom, type, description, tags, isFavourite } =
    (values as unknown as ICodeSnippet) || {};

  const handleClickAddNewTag = () => {
    setFieldValue?.('tags', [...tags, { name: newTag }]);
    setNewTag('');
  };

  const handleChangeProgrammingLanguage = (event: unknown, newValue: string | null) => {
    setFieldValue?.('programmingLanguage', newValue);
  };

  return (
    <SnippetAttributesWrapper>
      <MuiPaper elevation={2} style={{ padding: theme.spacing(2) }}>
        <SnippetAttributesContainer>
          <Input label="Name" value={name} id="name" onChange={handleChange} onBlur={handleBlur} />
          <MuiAutocomplete
            label="Programming language"
            id="programmingLanguage"
            value={programmingLanguage || 'js'}
            onChange={handleChangeProgrammingLanguage}
            options={refractor.listLanguages()}
          />
          <Input label="Type" id="type" value={type} onChange={handleChange} />
          <Input label="Creation place" id="addedFrom" value={addedFrom} onChange={handleChange} />
          <TextArea placeholder="Description" id="description" value={description} onChange={handleChange} />
          <FormControlLabel
            control={<Switch id="isFavourite" value={isFavourite} onChange={handleChange} />}
            label="Favourite:"
          />
        </SnippetAttributesContainer>
        <CustomDivider />
        <SnippetTags>
          <NewTagControls>
            <Input
              label="New tag"
              value={newTag}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewTag(event.target.value)}
            />
            <MuiButton text="Add" variant="contained" onClick={handleClickAddNewTag} />
          </NewTagControls>
          <NewSnippetTagsContainer>
            {tags?.map((tag: ITag) => (
              <MuiChip key={tag.name} name={`# ${tag.name}`} />
            ))}
          </NewSnippetTagsContainer>
        </SnippetTags>
      </MuiPaper>
    </SnippetAttributesWrapper>
  );
};

export default SnippetAttributes;
