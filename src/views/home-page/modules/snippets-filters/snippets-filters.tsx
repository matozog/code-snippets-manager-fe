import { FC, useState } from 'react';

import Dropdown from 'src/components/dropdown/dropdown';
import MultiSelect from 'src/components/multi-select/multi-select';
import { SelectChangeEvent } from '@mui/material';
import { SnippetsFiltersContainer } from './snippets-filters.jss';

const SnippetsFilters: FC = () => {
  const [sortBy] = useState('10');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOnChangeSortByDropdown = () => {
    undefined;
  };

  const handleOnChangeProgrammingLanguage = (event: SelectChangeEvent<typeof selectedOptions>) => {
    const { value } = event.target;
    setSelectedOptions(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <SnippetsFiltersContainer>
      <Dropdown handleOnChange={handleOnChangeSortByDropdown} value={sortBy} />
      <Dropdown handleOnChange={handleOnChangeSortByDropdown} value={sortBy} />
      <Dropdown handleOnChange={handleOnChangeSortByDropdown} value={sortBy} />
      <Dropdown handleOnChange={handleOnChangeSortByDropdown} value={sortBy} />
      <Dropdown handleOnChange={handleOnChangeSortByDropdown} value={sortBy} />
      <MultiSelect
        selectedOptions={selectedOptions}
        onChange={handleOnChangeProgrammingLanguage}
        options={['value', 'value1', 'value2']}
      />
    </SnippetsFiltersContainer>
  );
};

export default SnippetsFilters;
