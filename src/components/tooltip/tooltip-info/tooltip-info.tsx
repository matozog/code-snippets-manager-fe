import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';

const TooltipInfo = () => {
  return (
    <Tooltip title={'text'}>
      <InfoIcon />
    </Tooltip>
  );
};

export default TooltipInfo;
