import { FC } from 'react';
import { StyledChip } from './chip.jss';

interface IMuiChipProps {
  name: string;
  onDelete?: () => void;
}

const MuiChip: FC<IMuiChipProps> = ({ name, onDelete }) => {
  return <StyledChip label={name} onDelete={onDelete} />;
};

export default MuiChip;
