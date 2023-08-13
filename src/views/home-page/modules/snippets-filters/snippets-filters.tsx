import * as filtersDuck from 'src/store/reducers/filters';

import {
  CollapseFiltersComponent,
  CollapsedFiltersInfo,
  FilterIcon,
  FiltersControlsContainer,
  SnippetsFiltersContainer,
} from './snippets-filters.jss';
import { FC, MutableRefObject, useMemo, useRef, useState } from 'react';
import { IRootState, useAppDispatch, useAppSelector } from 'src/store/config/store';
import { SelectChangeEvent, useMediaQuery, useTheme } from '@mui/material';

import CustomDatepicker from 'src/components/datepicker/datepicker';
import CustomDivider from 'src/components/custom-divider/custom-divider';
import { Dayjs } from 'dayjs';
import Dropdown from 'src/components/dropdown/dropdown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MuiButton from 'src/components/buttons/button';
import MuiCheckbox from 'src/components/checkbox/checkbox';
import MuiPaper from 'src/components/paper/mui-paper';
import MultiSelect from 'src/components/multi-select/multi-select';
import RadiosGroup from 'src/components/radios-group/radios-group';
import { scrollToTop } from 'src/utils/utils';

interface ISnippetsFiltersProps {
  scrollContainerRef?: MutableRefObject<HTMLElement | undefined>;
}

const SnippetsFilters: FC<ISnippetsFiltersProps> = ({ scrollContainerRef }) => {
  const [areFiltersOpened, setAreFiltersOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filtersData = useAppSelector((root: IRootState) => root.snippetsFilters.filtersData);
  const sortBy = useAppSelector((root: IRootState) => root.snippetsFilters.sortBy);
  const programmingLanguage = useAppSelector((root: IRootState) => root.snippetsFilters.programmingLanguage);
  const selectedType = useAppSelector((root: IRootState) => root.snippetsFilters.type);
  const selectedCreationPlace = useAppSelector((root: IRootState) => root.snippetsFilters.creationPlace);
  const sortAsc = useAppSelector((root: IRootState) => root.snippetsFilters.sortAsc);
  const favourite = useAppSelector((root: IRootState) => root.snippetsFilters.favourite);
  const addedBefore = useAppSelector((root: IRootState) => root.snippetsFilters.addedBefore);
  const addedAfter = useAppSelector((root: IRootState) => root.snippetsFilters.addedAfter);
  const areFiltersCollapsed = useMemo(() => !areFiltersOpened && isMobile, [areFiltersOpened, isMobile]);

  const { creationPlaces, programmingLanguages, types, sortByOptions } = filtersData;

  const dispatch = useAppDispatch();

  const changeFilterField = (key: string, value: string | string[] | boolean) =>
    dispatch(filtersDuck.operations.changeFiltersField(key, value));

  const handleOnChangeSortByDropdown = (event: SelectChangeEvent<string>) => {
    changeFilterField('sortBy', event.target.value);
  };

  const handleOnChangeSortAscRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeFilterField('sortAsc', event.target.value === 'sortAsc');
  };

  const handleOnChangeProgrammingLanguage = (event: SelectChangeEvent<string | string[]>) => {
    const { value } = event.target;
    changeFilterField('programmingLanguage', typeof value === 'string' ? value.split(',') : value);
  };

  const handleOnChangeSnippetType = (event: SelectChangeEvent<string | string[]>) => {
    const { value } = event.target;
    changeFilterField('type', typeof value === 'string' ? value.split(',') : value);
  };

  const handleOnChangeSnippetLocalization = (event: SelectChangeEvent<string | string[]>) => {
    const { value } = event.target;
    changeFilterField('creationPlace', typeof value === 'string' ? value.split(',') : value);
  };

  const handleOnChangeFavouriteControl = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeFilterField('favourite', event.target.checked);
  };

  const handleOnChangeAddedBeforeDate = (newValue: Dayjs | null) =>
    dispatch(filtersDuck.operations.changeCalendarFilterField('addedBefore', newValue));

  const handleOnChangeAddedAfterDate = (newValue: Dayjs | null) =>
    dispatch(filtersDuck.operations.changeCalendarFilterField('addedAfter', newValue));

  const handleOnClearFiltersAction = () => dispatch(filtersDuck.operations.clearFilters());

  const ref = useRef<HTMLElement>();

  const handleClickOnExpandFilters = () => {
    if (areFiltersCollapsed) {
      setAreFiltersOpen(() => !areFiltersOpened);
    }
  };

  const handleClickOnCollapseFilters = () => {
    setAreFiltersOpen(false);
    scrollToTop(scrollContainerRef);
  };

  return (
    <SnippetsFiltersContainer ref={ref} onClick={handleClickOnExpandFilters} isReadyToExpand={areFiltersCollapsed}>
      <MuiPaper elevation={2}>
        {areFiltersCollapsed ? (
          <CollapsedFiltersInfo>
            Filters <FilterIcon />
          </CollapsedFiltersInfo>
        ) : (
          <FiltersControlsContainer>
            <Dropdown
              label="Sort by:"
              dropdownOptions={sortByOptions}
              handleOnChange={handleOnChangeSortByDropdown}
              value={sortBy}
            />
            <RadiosGroup
              radiosTitle="Sorting type:"
              value={sortAsc ? 'sortAsc' : 'sortDesc'}
              options={
                new Map([
                  ['sortAsc', 'Ascending'],
                  ['sortDesc', 'Descending'],
                ])
              }
              onChange={handleOnChangeSortAscRadio}
            />
            <CustomDivider />
            <MultiSelect
              selectedOptions={programmingLanguage}
              onChange={handleOnChangeProgrammingLanguage}
              options={programmingLanguages}
              label="Programming language"
            />
            <MultiSelect
              selectedOptions={selectedType}
              onChange={handleOnChangeSnippetType}
              options={types}
              label="Type"
            />
            <MultiSelect
              selectedOptions={selectedCreationPlace}
              onChange={handleOnChangeSnippetLocalization}
              options={creationPlaces}
              label="Added from"
            />
            <CustomDivider />
            <CustomDatepicker
              label="Min date"
              value={addedAfter}
              onChange={handleOnChangeAddedAfterDate}
              maxDate={addedBefore}
            />
            <CustomDatepicker
              label="Max date"
              value={addedBefore}
              onChange={handleOnChangeAddedBeforeDate}
              minDate={addedAfter}
            />
            <MuiCheckbox label="Favourite" value={favourite} onChange={handleOnChangeFavouriteControl} />
            <MuiButton text="Clear filters" variant="contained" onClick={handleOnClearFiltersAction} />
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
