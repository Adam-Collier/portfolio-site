import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia === 'undefined'
  ) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [matches, setMatches] = useState(!!window.matchMedia(query).matches);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const media = window.matchMedia(query);

    const handler = () => setMatches(!!media.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
