import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

function useScrollRevealState(delay: number = 0) {
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
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    className: cn("scroll-reveal", isVisible && "is-visible"),
    style: delay > 0 ? ({ transitionDelay: `${delay}ms` } as React.CSSProperties) : undefined,
  };
}

export function ScrollRevealWrapper({
  children,
  delay = 0,
  className,
}: ScrollRevealWrapperProps) {
  const reveal = useScrollRevealState(delay);

  return (
    <div
      ref={reveal.ref as React.RefObject<HTMLDivElement>}
      className={cn(reveal.className, className)}
      style={reveal.style}
    >
      {children}
    </div>
  );
}

interface ScrollRevealTrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  delay?: number;
}

export function ScrollRevealTr({ children, delay = 0, className, ...props }: ScrollRevealTrProps) {
  const reveal = useScrollRevealState(delay);

  return (
    <tr
      ref={reveal.ref as React.RefObject<HTMLTableRowElement>}
      className={cn(reveal.className, className)}
      style={reveal.style}
      {...props}
    >
      {children}
    </tr>
  );
}
