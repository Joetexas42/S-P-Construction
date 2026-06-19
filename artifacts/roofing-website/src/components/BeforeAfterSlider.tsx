import { useCallback, useEffect, useRef, useState } from "react";
import { ResponsiveImage } from "@/components/ResponsiveImage";

interface BeforeAfterImage {
  base: string;
  alt: string;
}

interface BeforeAfterSliderProps {
  before: BeforeAfterImage;
  after: BeforeAfterImage;
  sizes?: string;
  testIdPrefix?: string;
  initialPosition?: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function BeforeAfterSlider({
  before,
  after,
  sizes = "(min-width: 1024px) 768px, 100vw",
  testIdPrefix,
  initialPosition = 50,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(clamp(initialPosition, 0, 100));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clamp(next, 0, 100));
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      draggingRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      updateFromClientX(event.clientX);
    },
    [updateFromClientX],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      updateFromClientX(event.clientX);
    },
    [updateFromClientX],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      draggingRef.current = false;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [],
  );

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 2;
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        setPosition((p) => clamp(p - step, 0, 100));
        break;
      case "ArrowRight":
        event.preventDefault();
        setPosition((p) => clamp(p + step, 0, 100));
        break;
      case "Home":
        event.preventDefault();
        setPosition(0);
        break;
      case "End":
        event.preventDefault();
        setPosition(100);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    return () => {
      draggingRef.current = false;
    };
  }, []);

  const positionStr = `${position}%`;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted select-none touch-none cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
      role="slider"
      aria-label={`Before and after comparison: drag to reveal. Before: ${before.alt}. After: ${after.alt}.`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-valuetext={`${Math.round(position)}% after image revealed`}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      data-testid={testIdPrefix ? `${testIdPrefix}-slider` : undefined}
    >
      {/* After image (base layer, fully visible) */}
      <ResponsiveImage
        base={after.base}
        sizes={sizes}
        alt={after.alt}
        width={1280}
        height={960}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        data-testid={testIdPrefix ? `${testIdPrefix}-after-image` : undefined}
      />

      {/* Before image (clipped via inset clip-path so it never distorts) */}
      <ResponsiveImage
        base={before.base}
        sizes={sizes}
        alt={before.alt}
        width={1280}
        height={960}
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        data-testid={testIdPrefix ? `${testIdPrefix}-before-image` : undefined}
      />

      {/* Labels */}
      <span className="absolute top-3 left-3 z-10 text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-primary/85 text-primary-foreground backdrop-blur-sm pointer-events-none">
        Before
      </span>
      <span className="absolute top-3 right-3 z-10 text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-secondary/90 text-secondary-foreground backdrop-blur-sm pointer-events-none">
        After
      </span>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)] pointer-events-none"
        style={{ left: positionStr, transform: "translateX(-50%)" }}
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center gap-0.5 ring-1 ring-black/10 text-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </div>
      </div>
    </div>
  );
}
