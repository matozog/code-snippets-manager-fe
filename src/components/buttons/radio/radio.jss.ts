import { Radio } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledRadioButton = styled(Radio)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
