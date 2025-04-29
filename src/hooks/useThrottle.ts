import { useCallback, useRef } from "react";

export function useThrottleFn<T extends (...args: any[]) => void>(fn: T, delay: number) {
  const lastExecuted = useRef<number>(0);

  const throttledFn = useCallback((...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastExecuted.current >= delay) {
      lastExecuted.current = now;
      fn(...args);
    }
  }, [fn, delay]);

  return throttledFn;
}