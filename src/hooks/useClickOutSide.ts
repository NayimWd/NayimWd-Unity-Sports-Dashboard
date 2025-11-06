import React, { useEffect, useRef } from "react";

type ClickOutSideHandler = (event: MouseEvent | TouchEvent) => void;

const useClickOutSide = (
  ref: React.RefObject<HTMLElement | null>,
  handler: ClickOutSideHandler
) => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(e.target as Node)) return;

      handlerRef.current(e);
    };

    document.addEventListener("pointerdown", listener);

    return () => {
      document.removeEventListener("pointerdown", listener);
    };
  }, [ref]);
};

export default useClickOutSide;
