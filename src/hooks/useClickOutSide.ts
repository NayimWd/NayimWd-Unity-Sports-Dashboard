import React, { useEffect } from "react";

type ClickOutSideHandler = (event: MouseEvent | TouchEvent) => void;

const useClickOutSide = (
  ref: React.RefObject<HTMLElement>,
  handler: ClickOutSideHandler
) => {
  useEffect(() => {
    const listner = (e: MouseEvent | TouchEvent) => {
      const element = ref?.current;

      if (!element || element.contains(e.target as Node)) {
        return;
      }

      handler(e);
    };

    document.addEventListener("mousedown", listner);
    document.addEventListener("touchstart", listner);

    return () => {
      document.removeEventListener("mousedown", listner);
      document.removeEventListener("touchstart", listner);
    };
  }, [ref, handler]);
};

export default useClickOutSide;
