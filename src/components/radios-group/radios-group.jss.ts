import { FormLabel, RadioGroup } from '@mui/material';

import { styled } from '@mui/material/styles';

export const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  paddingBottom: theme.spacing(1),
}));

export const StyledRadioGroup = styled(RadioGroup)(() => ({}));
