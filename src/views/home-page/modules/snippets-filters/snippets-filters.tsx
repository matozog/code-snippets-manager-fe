import { FC, useState } from 'react';
import { IRootState, useAppSelector } from 'src/store/config/store';

import CustomDatepicker from 'src/components/datepicker/datepicker';
import CustomDivider from 'src/components/custom-divider/custom-divider';
import Dropdown from 'src/components/dropdown/dropdown';
import MuiButton from 'src/components/buttons/button';
import MuiCheckbox from 'src/components/checkbox/checkbox';
import MultiSelect from 'src/components/multi-select/multi-select';
import RadiosGroup from 'src/components/radios-group/radios-group';
import { SelectChangeEvent } from '@mui/material';
import { SnippetsFiltersContainer } from './snippets-filters.jss';

const SnippetsFilters: FC = () => {
  const [sortBy] = useState('10');
  const [selectedProgrammingLanguages, setSelectedProgrammingLanguages] = useState<string[]>([]);
  const [selectedSnippetType, setSelectedSnippetType] = useState<string[]>([]);
  const [selectedSnippetLocalization, setSelectedSnippetLocalization] = useState<string[]>([]);

  const filtersData = useAppSelector((root: IRootState) => root.snippetsFilters.filtersData);
  const { creationPlaces, programmingLanguages, types } = filtersData;

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
        options={programmingLanguages}
        label="Programming language"
      />
      <MultiSelect
        selectedOptions={selectedSnippetType}
        onChange={handleOnChangeSnippetType}
        options={types}
        label="Type"
      />
      <MultiSelect
        selectedOptions={selectedSnippetLocalization}
        onChange={handleOnChangeSnippetLocalization}
        options={creationPlaces}
        label="Added from"
      />
      <CustomDivider />
      <CustomDatepicker label="Adder afer" />
      <CustomDatepicker label="Adder before" />
      <MuiCheckbox label="Favourite" />
      <MuiButton text="Refresh" variant="contained" />
    </SnippetsFiltersContainer>
  );
};

export default SnippetsFilters;
