import { useEffect, useRef, type RefObject } from "react";

interface UseClickOutsideOptions {
  enabled?: boolean;
  onEscape?: boolean;
}

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  options: UseClickOutsideOptions = { enabled: true, onEscape: true }
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (options.enabled === false) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (options.onEscape && event.key === "Escape") {
        handler();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handler, options.enabled, options.onEscape]);

  return ref;
}
