import { useEffect, useRef, useState } from "react";

export function useRevealGrid<T extends HTMLElement = HTMLDivElement>(
  options: { stagger?: number; threshold?: number } = {},
) {
  const { stagger = 60, threshold = 0.08 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = Array.from(container.children) as HTMLElement[];

    items.forEach((item, i) => {
      item.classList.add("scroll-reveal");
      if (stagger > 0) {
        item.style.transitionDelay = `${i * stagger}ms`;
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
  }, [stagger, threshold]);

  return ref;
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
