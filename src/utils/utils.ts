import { RefObject } from 'react';

export const scrollToTop = (elementToScroll?: RefObject<HTMLElement | null>) => {
  elementToScroll?.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};
