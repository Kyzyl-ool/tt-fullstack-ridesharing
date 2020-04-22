import { useEffect } from 'react';

export function useBackButton(handler) {
  useEffect(() => {
    window.addEventListener('popstate', handler);

    return () => {
      window.removeEventListener('popstate', handler);
    };
  }, [handler]);
}
