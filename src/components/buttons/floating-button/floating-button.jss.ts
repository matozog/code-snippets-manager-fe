import { Fab, styled } from '@mui/material';

interface StyledFabProps {
  isVisible?: boolean;
  withFadeIn?: boolean;
}

export const StyledFab = styled(Fab, {
  shouldForwardProp: (prop) => prop !== 'isVisible' && prop !== 'withFadeIn',
})<StyledFabProps>(({ theme, isVisible, withFadeIn }) => {
  const animationRule = isVisible && withFadeIn ? 'fadeIn 2s' : '';

  return {
    position: 'sticky',
    bottom: '20px',
    right: '20px',
    width: '40px',
    minHeight: '40px',
    height: '40px',
    background: theme.palette.text.primary,
    opacity: '0.9',
    color: 'black',
    float: 'right',
    visibility: isVisible ? 'visible' : 'hidden',
    animation: animationRule,
    '&:hover': {
      background: theme.palette.text.primary,
    },
    '@keyframes fadeIn': {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
  };
});
