import { useEffect, useRef, useState } from "react";

interface UseVisibilityOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export const useVisibility = (options?: UseVisibilityOptions) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options?.triggerOnce) {
          observer.disconnect();
        }
      } else if (!options?.triggerOnce) {
        setIsVisible(false);
      }
    }, options);

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isVisible };
};
