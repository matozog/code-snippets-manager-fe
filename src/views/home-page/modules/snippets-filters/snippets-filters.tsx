import {
  CollapseFiltersComponent,
  CollapsedFiltersInfo,
  FilterIcon,
  FiltersControlsContainer,
  SnippetsFiltersContainer,
} from './snippets-filters.jss';
import { FC, RefObject, useState } from 'react';
import { FILTER_DATE_FORMAT, SORT_BY_OPTIONS, SortByType } from 'src/store/reducers/filters/constants';
import { IFiltersState, changeFilters, clearFilters } from 'src/store/reducers/filters/filters.slice';
import { SelectChangeEvent, useMediaQuery, useTheme } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from 'src/store/config/store';

import CustomDatepicker from 'src/components/datepicker/datepicker';
import CustomDivider from 'src/components/custom-divider/custom-divider';
import Dropdown from 'src/components/dropdown/dropdown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MuiButton from 'src/components/buttons/button';
import MuiCheckbox from 'src/components/checkbox/checkbox';
import MuiPaper from 'src/components/paper/mui-paper';
import MultiSelect from 'src/components/multi-select/multi-select';
import RadiosGroup from 'src/components/radios-group/radios-group';
import { scrollToTop } from 'src/utils/utils';
import { selectFilterOptions } from 'src/store/reducers/snippets/selectors';

const SORT_DIRECTION_OPTIONS = new Map([
  ['sortAsc', 'Ascending'],
  ['sortDesc', 'Descending'],
]);

type MultiSelectFilter = 'programmingLanguage' | 'type' | 'creationPlace';

const toFilterDate = (value: Dayjs | null) => (value?.isValid() ? value.format(FILTER_DATE_FORMAT) : null);
const toPickerDate = (value: string | null) => (value ? dayjs(value) : null);

interface ISnippetsFiltersProps {
  scrollContainerRef?: RefObject<HTMLElement | null>;
}

const SnippetsFilters: FC<ISnippetsFiltersProps> = ({ scrollContainerRef }) => {
  const [areFiltersOpened, setAreFiltersOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const areFiltersCollapsed = !areFiltersOpened && isMobile;

  const filters = useAppSelector((state) => state.snippetsFilters);
  const { creationPlaces, programmingLanguages, types } = useAppSelector(selectFilterOptions);

  const dispatch = useAppDispatch();
  const setFilters = (changes: Partial<IFiltersState>) => dispatch(changeFilters(changes));

  // MUI multi-select may report the value as a comma separated string (browser autofill)
  const handleOnChangeMultiSelect = (field: MultiSelectFilter) => (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setFilters({ [field]: typeof value === 'string' ? value.split(',') : value });
  };

  const handleClickOnExpandFilters = () => {
    if (areFiltersCollapsed) setAreFiltersOpen(true);
  };

  const handleClickOnCollapseFilters = () => {
    setAreFiltersOpen(false);
    scrollToTop(scrollContainerRef);
  };

  return (
    <SnippetsFiltersContainer onClick={handleClickOnExpandFilters} isReadyToExpand={areFiltersCollapsed}>
      <MuiPaper elevation={2}>
        {areFiltersCollapsed ? (
          <CollapsedFiltersInfo>
            Filters <FilterIcon />
          </CollapsedFiltersInfo>
        ) : (
          <FiltersControlsContainer>
            <Dropdown
              label="Sort by:"
              dropdownOptions={SORT_BY_OPTIONS}
              handleOnChange={(event) => setFilters({ sortBy: event.target.value as SortByType })}
              value={filters.sortBy}
            />
            <RadiosGroup
              radiosTitle="Sorting type:"
              value={filters.sortAsc ? 'sortAsc' : 'sortDesc'}
              options={SORT_DIRECTION_OPTIONS}
              onChange={(event) => setFilters({ sortAsc: event.target.value === 'sortAsc' })}
            />
            <CustomDivider />
            <MultiSelect
              selectedOptions={filters.programmingLanguage}
              onChange={handleOnChangeMultiSelect('programmingLanguage')}
              options={programmingLanguages}
              label="Programming language"
            />
            <MultiSelect
              selectedOptions={filters.type}
              onChange={handleOnChangeMultiSelect('type')}
              options={types}
              label="Type"
            />
            <MultiSelect
              selectedOptions={filters.creationPlace}
              onChange={handleOnChangeMultiSelect('creationPlace')}
              options={creationPlaces}
              label="Added from"
            />
            <CustomDivider />
            <CustomDatepicker
              label="Min date"
              value={toPickerDate(filters.addedAfter)}
              onChange={(value) => setFilters({ addedAfter: toFilterDate(value) })}
              maxDate={toPickerDate(filters.addedBefore)}
            />
            <CustomDatepicker
              label="Max date"
              value={toPickerDate(filters.addedBefore)}
              onChange={(value) => setFilters({ addedBefore: toFilterDate(value) })}
              minDate={toPickerDate(filters.addedAfter)}
            />
            <MuiCheckbox
              label="Favourite"
              value={filters.favourite}
              onChange={(event) => setFilters({ favourite: event.target.checked })}
            />
            <MuiButton text="Clear filters" variant="contained" onClick={() => dispatch(clearFilters())} />
            {areFiltersOpened && isMobile && (
              <CollapseFiltersComponent onClick={handleClickOnCollapseFilters}>
                <KeyboardArrowUpIcon />
              </CollapseFiltersComponent>
            )}
          </FiltersControlsContainer>
        )}
      </MuiPaper>
    </SnippetsFiltersContainer>
  );
};

export default SnippetsFilters;
