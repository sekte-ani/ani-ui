// src/hooks/useBreakpoint.ts
import { useState, useEffect } from "react";

const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const;

type Breakpoint = keyof typeof breakpoints;
type BreakpointState = Record<Breakpoint, boolean | undefined>;

const initialState: BreakpointState = {
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  "2xl": undefined,
};

export function useBreakpoint() {
  const [matches, setMatches] = useState<BreakpointState>(initialState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mediaQueries = Object.entries(breakpoints).map(([key, query]) => ({
      key: key as Breakpoint,
      mq: window.matchMedia(query),
    }));

    const update = () => {
      setMatches(
        Object.fromEntries(
          mediaQueries.map(({ key, mq }) => [key, mq.matches]),
        ) as Record<Breakpoint, boolean>,
      );
      setIsReady(true);
    };

    update();
    mediaQueries.forEach(({ mq }) => mq.addEventListener("change", update));
    return () =>
      mediaQueries.forEach(({ mq }) =>
        mq.removeEventListener("change", update),
      );
  }, []);

  return { ...matches, isReady };
}
