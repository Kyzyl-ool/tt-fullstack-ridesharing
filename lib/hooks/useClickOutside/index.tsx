import { useEffect, useCallback } from 'react';

type useClickOutsideHook = (target: Node | null, onClickOutside: () => void) => void;

export const useClickOutside: useClickOutsideHook = (target, onClickOutside) => {
  const clickListener = useCallback(
    (event: MouseEvent) => {
      if (target && !target.contains(event.target as any)) {
        onClickOutside();
      }
    },
    [onClickOutside]
  );
  useEffect(() => {
    document.addEventListener('click', clickListener);
    return () => document.removeEventListener('click', clickListener);
  }, [target, clickListener]);
};
