import { useEffect, useState } from 'react';

export const useActiveHash = (headings, rootMargin = undefined) => {
  const [activeHash, setActiveHash] = useState(``);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(entry.target.id);
          }
        });
      },
      {
        rootMargin: rootMargin || `0% 0% -80% 0%`,
      }
    );

    headings.forEach(({ id }) => {
      observer.observe(document.getElementById(id));
    });

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeHash;
};
