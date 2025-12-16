import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

export type VisibilityObserverConfig = {
  containerRef: RefObject<HTMLDivElement | null>;
  itemSelector: string;
  datasetKey: string;
  setVisibleIds: Dispatch<SetStateAction<number[]>>;
  dependencies: unknown[];
};

export const useVisibilityObserver = ({
  containerRef,
  itemSelector,
  datasetKey,
  setVisibleIds,
  dependencies,
}: VisibilityObserverConfig) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setVisibleIds([]);

    const cards = container.querySelectorAll<HTMLDivElement>(itemSelector);
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          const idAttr = element.dataset[datasetKey];
          const id = idAttr ? Number(idAttr) : NaN;

          if (Number.isNaN(id)) return;

          setVisibleIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

          observer.unobserve(element);
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, itemSelector, datasetKey, setVisibleIds, ...dependencies]);
};

export const useVisibilityObservers = (configs: VisibilityObserverConfig[]) => {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    configs.forEach(
      ({ containerRef, itemSelector, datasetKey, setVisibleIds }) => {
        const container = containerRef.current;
        if (!container) {
          return;
        }

        setVisibleIds([]);

        const cards = container.querySelectorAll<HTMLDivElement>(itemSelector);
        if (!cards.length) {
          return;
        }

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                return;
              }

              const element = entry.target as HTMLElement;
              const idAttr = element.dataset[datasetKey];
              const id = idAttr ? Number(idAttr) : NaN;

              if (Number.isNaN(id)) {
                return;
              }

              setVisibleIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

              observer.unobserve(element);
            });
          },
          { threshold: 0.3, rootMargin: '0px 0px -10% 0px' },
        );

        cards.forEach((card) => observer.observe(card));
        observers.push(observer);
      },
    );

    return () => observers.forEach((observer) => observer.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configs]);
};
