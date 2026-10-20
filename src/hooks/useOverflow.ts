import { RefObject, useLayoutEffect, useState } from 'react';

export const useIsOverflow = <T extends HTMLElement>(
  ref?: RefObject<T | null>,
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

    if (!current) return;

    trigger();

    if (!('ResizeObserver' in window)) return;

    const resizeObserver = new ResizeObserver(trigger);
    resizeObserver.observe(current);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return { isOverflow, isHorizontalOverflow };
};
