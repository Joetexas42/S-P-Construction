import { useState, useRef, useCallback } from "react";
import { CARD_EXIT_BASE_MS, CARD_EXIT_STAGGER_MS } from "@/lib/animation";

/**
 * Encapsulates the exit-animation state and timer logic shared across pages
 * that swap their displayed data when a route param changes.
 *
 * @param sectionCount - Number of animated sections/cards used to compute the
 *   total exit duration: CARD_EXIT_BASE_MS + sectionCount * CARD_EXIT_STAGGER_MS
 *
 * Returns:
 *   - `exiting` — true while the exit animation is running
 *   - `exitDuration` — computed ms value (useful for `animationDelay` math)
 *   - `triggerExit(onComplete)` — start the exit animation; calls `onComplete`
 *     when the timer fires and clears `exiting`. Returns a cleanup function
 *     suitable for use as a useEffect return value.
 */
export function usePageExit(sectionCount: number) {
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const exitDuration = CARD_EXIT_BASE_MS + sectionCount * CARD_EXIT_STAGGER_MS;

  const triggerExit = useCallback(
    (onComplete: () => void): (() => void) => {
      clearTimeout(timerRef.current);
      setExiting(true);
      timerRef.current = setTimeout(() => {
        onComplete();
        setExiting(false);
      }, exitDuration);
      return () => clearTimeout(timerRef.current);
    },
    [exitDuration],
  );

  return { exiting, exitDuration, triggerExit };
}
