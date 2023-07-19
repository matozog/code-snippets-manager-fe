import { Box } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material/styles';

export const SnippetsFiltersContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isReadyToExpand',
})<{ isReadyToExpand?: boolean }>(({ theme, isReadyToExpand }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: `calc(100% - ${theme.spacing(8)})`,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: '6px',
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  justifyContent: isReadyToExpand ? 'center' : 'flex-start',
  cursor: isReadyToExpand ? 'pointer' : 'default',
  [theme.breakpoints.up('md')]: {
    width: '25%',
    maxHeight: `calc(100% - ${theme.spacing(8)})`,
    marginBottom: 'auto',
  },
}));

export const CollapsedFiltersInfo = styled(Box)(() => ({
  justifyContent: 'center',
  display: 'flex',
}));

export const FilterIcon = styled(FilterListIcon)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

export const CollapseFiltersComponent = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
});
