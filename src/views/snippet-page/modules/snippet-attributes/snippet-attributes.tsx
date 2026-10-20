import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FormControlLabel, FormHelperText, Switch, useTheme } from '@mui/material';
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
import { FormikErrors, FormikTouched, FormikValues, useFormik } from 'formik';
import MuiAutocomplete from 'src/components/autocomplete/autocomplete';
import { refractor } from 'refractor';

export interface ISnippetAttributes<K extends FormikValues> {
  formikProps?: ReturnType<typeof useFormik<K>>;
}

const SnippetAttributes = <K extends FormikValues>({ formikProps }: ISnippetAttributes<K>) => {
  const theme = useTheme();
  const [newTag, setNewTag] = useState('');

  const { handleChange, handleBlur, values, setFieldValue, setFieldTouched, submitCount } = formikProps || {};
  const errors = formikProps?.errors as FormikErrors<ICodeSnippet> | undefined;
  const touched = formikProps?.touched as FormikTouched<ICodeSnippet> | undefined;
  const { name, programmingLanguage, addedFrom, type, description, tags, favorite } =
    (values as unknown as ICodeSnippet) || {};

  // errors are shown once the field was visited or the user tried to save
  const getFieldError = (field: keyof ICodeSnippet): string | undefined => {
    const error = errors?.[field];
    const isVisible = !!submitCount || !!touched?.[field];
    return isVisible && typeof error === 'string' ? error : undefined;
  };

  const newTagName = newTag.trim();
  const isDuplicatedTag = tags?.some((tag) => tag.name === newTagName);

  const handleClickAddNewTag = () => {
    if (!newTagName || isDuplicatedTag) return;
    setFieldValue?.('tags', [...tags, { name: newTagName }]);
    setNewTag('');
  };

  const handleNewTagKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return;
    // Enter adds the tag instead of submitting the whole form
    event.preventDefault();
    handleClickAddNewTag();
  };

  const handleRemoveTag = (tagName: string) => {
    setFieldValue?.(
      'tags',
      tags.filter((tag) => tag.name !== tagName),
    );
  };

  const handleChangeProgrammingLanguage = (event: unknown, newValue: string | null) => {
    setFieldValue?.('programmingLanguage', newValue);
  };

  const tagsError = getFieldError('tags');

  return (
    <SnippetAttributesWrapper>
      <MuiPaper elevation={2} style={{ padding: theme.spacing(2) }}>
        <SnippetAttributesContainer>
          <Input
            label="Name"
            value={name}
            id="name"
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError('name')}
          />
          <MuiAutocomplete
            label="Programming language"
            id="programmingLanguage"
            value={programmingLanguage}
            onChange={handleChangeProgrammingLanguage}
            onBlur={() => setFieldTouched?.('programmingLanguage')}
            options={refractor.listLanguages()}
            error={getFieldError('programmingLanguage')}
          />
          <Input
            label="Type"
            id="type"
            value={type}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError('type')}
          />
          <Input
            label="Creation place"
            id="addedFrom"
            value={addedFrom}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError('addedFrom')}
          />
          <TextArea placeholder="Description" id="description" value={description} onChange={handleChange} />
          <FormControlLabel
            control={<Switch id="favorite" checked={favorite} onChange={handleChange} />}
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
              onKeyDown={handleNewTagKeyDown}
              error={isDuplicatedTag ? 'Tag already added.' : undefined}
            />
            <MuiButton
              text="Add"
              variant="contained"
              onClick={handleClickAddNewTag}
              disabled={!newTagName || isDuplicatedTag}
            />
          </NewTagControls>
          <NewSnippetTagsContainer>
            {tags?.map((tag: ITag) => (
              <MuiChip key={tag.name} name={`# ${tag.name}`} onDelete={() => handleRemoveTag(tag.name)} />
            ))}
          </NewSnippetTagsContainer>
          {tagsError && <FormHelperText error>{tagsError}</FormHelperText>}
        </SnippetTags>
      </MuiPaper>
    </SnippetAttributesWrapper>
  );
};

export default SnippetAttributes;
