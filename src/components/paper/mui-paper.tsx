import { FC, PropsWithChildren } from 'react';

import { StyledPaper } from './mui-paper.jss';

export interface MuiPaperProps extends PropsWithChildren {
  elevation?: number;
  style?: React.CSSProperties;
}

const MuiPaper: FC<MuiPaperProps> = ({ elevation = 2, children, style }) => {
  return (
    <StyledPaper elevation={elevation} style={style}>
      {children}
    </StyledPaper>
  );
};

export default MuiPaper;
