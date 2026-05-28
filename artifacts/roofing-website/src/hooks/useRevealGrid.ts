import { useEffect, useRef, useState } from "react";

const DEFAULT_STAGGER = 60;
const DEFAULT_MAX_DELAY = 200;

export function useRevealGrid<T extends HTMLElement = HTMLDivElement>(
  options: { stagger?: number; threshold?: number; maxDelay?: number } = {},
) {
  const {
    stagger = DEFAULT_STAGGER,
    threshold = 0.08,
    maxDelay = DEFAULT_MAX_DELAY,
  } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = Array.from(container.children) as HTMLElement[];

    const rowTopValues = Array.from(new Set(items.map((el) => el.offsetTop))).sort(
      (a, b) => a - b,
    );
    const rowIndexByTop = new Map(rowTopValues.map((top, i) => [top, i]));

    items.forEach((item) => {
      item.classList.add("scroll-reveal");
      if (stagger > 0) {
        const row = rowIndexByTop.get(item.offsetTop) ?? 0;
        item.style.transitionDelay = `${Math.min(row * stagger, maxDelay)}ms`;
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [stagger, threshold, maxDelay]);

  return ref;
}

export function rowDelay(
  index: number,
  columns: number,
  stagger = DEFAULT_STAGGER,
  maxMs = DEFAULT_MAX_DELAY,
): number {
  return Math.min(Math.floor(index / columns) * stagger, maxMs);
}

export function useScrollReveal(options: { threshold?: number } = {}) {
  const { threshold = 0.08 } = options;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
