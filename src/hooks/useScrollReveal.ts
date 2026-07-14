import { DependencyList, useEffect } from "react";

type ScrollRevealOptions = {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export function useScrollReveal(
  dependencies: DependencyList = [],
  { once = true, threshold = 0.18, rootMargin = "-8% 0px -22%" }: ScrollRevealOptions = {},
) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observers: IntersectionObserver[] = [];

    elements.forEach((element) => {
      const elementThreshold = Number(element.dataset.revealThreshold ?? threshold);
      const elementMargin = element.dataset.revealMargin ?? rootMargin;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          if (once) observer.unobserve(entry.target);
        },
        { threshold: elementThreshold, rootMargin: elementMargin },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
    // The caller controls when newly rendered tab content should be observed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
