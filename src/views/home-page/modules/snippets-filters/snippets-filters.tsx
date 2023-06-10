import { FC, useState } from 'react';

import CustomDivider from 'src/components/custom-divider/custom-divider';
import Dropdown from 'src/components/dropdown/dropdown';
import MultiSelect from 'src/components/multi-select/multi-select';
import RadiosGroup from 'src/components/radios-group/radios-group';
import { SelectChangeEvent } from '@mui/material';
import { SnippetsFiltersContainer } from './snippets-filters.jss';

const SnippetsFilters: FC = () => {
  const [sortBy] = useState('10');
  const [selectedProgrammingLanguages, setSelectedProgrammingLanguages] = useState<string[]>([]);
  const [selectedSnippetType, setSelectedSnippetType] = useState<string[]>([]);
  const [selectedSnippetLocalization, setSelectedSnippetLocalization] = useState<string[]>([]);

  const handleOnChangeSortByDropdown = () => {
    undefined;
  };

  const handleOnChangeProgrammingLanguage = (event: SelectChangeEvent<typeof selectedProgrammingLanguages>) => {
    const { value } = event.target;
    setSelectedProgrammingLanguages(typeof value === 'string' ? value.split(',') : value);
  };

  const handleOnChangeSnippetType = (event: SelectChangeEvent<typeof selectedSnippetType>) => {
    const { value } = event.target;
    setSelectedSnippetType(typeof value === 'string' ? value.split(',') : value);
  };

  const handleOnChangeSnippetLocalization = (event: SelectChangeEvent<typeof selectedSnippetLocalization>) => {
    const { value } = event.target;
    setSelectedSnippetLocalization(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <SnippetsFiltersContainer>
      <Dropdown label="Sort by:" handleOnChange={handleOnChangeSortByDropdown} value={sortBy} />
      <RadiosGroup radiosTitle="Sorting type:" />
      <CustomDivider />
      <MultiSelect
        selectedOptions={selectedProgrammingLanguages}
        onChange={handleOnChangeProgrammingLanguage}
        options={['value', 'value1', 'value2']}
        label="Programming language"
      />
      <MultiSelect
        selectedOptions={selectedSnippetType}
        onChange={handleOnChangeSnippetType}
        options={['value', 'value1', 'value2']}
        label="Type"
      />
      <MultiSelect
        selectedOptions={selectedSnippetLocalization}
        onChange={handleOnChangeSnippetLocalization}
        options={['value', 'value1', 'value2']}
        label="Added from"
      />
      <CustomDivider />
    </SnippetsFiltersContainer>
  );
};

export default SnippetsFilters;
