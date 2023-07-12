import { MutableRefObject, useLayoutEffect, useState } from 'react';

export const useIsOverflow = <T extends HTMLElement>(
  ref?: MutableRefObject<T | undefined>
): { isOverflow: boolean; isHorizontalOverflow: boolean } => {
  const [isOverflow, setIsOverflow] = useState(false);
  const [isHorizontalOverflow, setIsHorizontalOverflow] = useState(false);

  useLayoutEffect(() => {
    const { current } = ref || {};

    const trigger = () => {
      const hasOverflow = current && current?.scrollHeight > current.clientHeight;
      const hasHorizontalOverflow = current && current?.scrollWidth > current.clientWidth;

      setIsOverflow(!!hasOverflow);
      setIsHorizontalOverflow(!!hasHorizontalOverflow);
    };

    if (current) {
      trigger();
    }
  }, [ref]);

  return { isOverflow, isHorizontalOverflow };
};
