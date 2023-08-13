import { FC } from 'react';
import MuiButton from '../button';

interface IReadMoreButtonProps {
  onClick?: () => void;
}

const ReadMoreButton: FC<IReadMoreButtonProps> = ({ onClick }) => {
  return <MuiButton text="Read more" variant="outlined" onClick={onClick} />;
};

export default ReadMoreButton;
