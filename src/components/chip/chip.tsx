import { FC } from 'react';
import { StyledChip } from './chip.jss';

interface IMuiChipProps {
  name: string;
}

const MuiChip: FC<IMuiChipProps> = ({ name }) => {
  return <StyledChip label={name} />;
};

export default MuiChip;
