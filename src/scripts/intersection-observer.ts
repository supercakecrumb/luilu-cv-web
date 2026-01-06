/**
 * Intersection Observer Utility
 * Reusable utility for creating and managing intersection observers
 */

import { OBSERVER_CONFIG } from '../utils/constants';

/**
 * Observer options interface
 */
export interface ObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean; // Unobserve after first trigger
  root?: Element | null;
}

/**
 * Intersection Observer Utility Class
 */
export class IntersectionObserverUtil {
  /**
   * Create a new intersection observer with custom options
   */
  public static create(
    callback: IntersectionObserverCallback,
    options: ObserverOptions = {}
  ): IntersectionObserver {
    const defaultOptions: IntersectionObserverInit = {
      threshold: options.threshold ?? OBSERVER_CONFIG.THRESHOLD,
      rootMargin: options.rootMargin ?? OBSERVER_CONFIG.ROOT_MARGIN,
      root: options.root ?? null,
    };

    // Wrap callback to handle "once" option
    const wrappedCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && options.once) {
          observer.unobserve(entry.target);
        }
      });
      callback(entries, observer);
    };

    return new IntersectionObserver(wrappedCallback, defaultOptions);
  }

  /**
   * Observe multiple elements with a single observer
   */
  public static observeElements(
    observer: IntersectionObserver,
    elements: NodeListOf<Element> | Element[]
  ): void {
    const elementsArray = Array.isArray(elements) ? elements : Array.from(elements);
    elementsArray.forEach((element) => observer.observe(element));
  }

  /**
   * Unobserve multiple elements
   */
  public static unobserveElements(
    observer: IntersectionObserver,
    elements: NodeListOf<Element> | Element[]
  ): void {
    const elementsArray = Array.isArray(elements) ? elements : Array.from(elements);
    elementsArray.forEach((element) => observer.unobserve(element));
  }

  /**
   * Create an observer for scroll animations
   */
  public static createAnimationObserver(
    animationClass: string = 'visible',
    options: ObserverOptions = {}
  ): IntersectionObserver {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
        }
      });
    };

    return IntersectionObserverUtil.create(callback, {
      threshold: 0.2,
      once: true,
      ...options,
    });
  }

  /**
   * Create an observer for lazy loading images
   */
  public static createLazyLoadObserver(
    onLoad: (element: Element) => void,
    options: ObserverOptions = {}
  ): IntersectionObserver {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onLoad(entry.target);
        }
      });
    };

    return IntersectionObserverUtil.create(callback, {
      rootMargin: '50px',
      once: true,
      ...options,
    });
  }

  /**
   * Create an observer for section tracking (navigation)
   */
  public static createSectionObserver(
    onSectionChange: (sectionId: string) => void,
    options: ObserverOptions = {}
  ): IntersectionObserver {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId) {
            onSectionChange(sectionId);
          }
        }
      });
    };

    return IntersectionObserverUtil.create(callback, {
      threshold: 0.5,
      rootMargin: '-100px 0px -50% 0px',
      ...options,
    });
  }

  /**
   * Check if IntersectionObserver is supported
   */
  public static isSupported(): boolean {
    return (
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype
    );
  }

  /**
   * Polyfill check and warning
   */
  public static checkSupport(): void {
    if (!IntersectionObserverUtil.isSupported()) {
      console.warn(
        'IntersectionObserver is not supported in this browser. Consider adding a polyfill.'
      );
    }
  }
}

/**
 * Export default instance creation function for convenience
 */
export function createObserver(
  callback: IntersectionObserverCallback,
  options?: ObserverOptions
): IntersectionObserver {
  return IntersectionObserverUtil.create(callback, options);
}

/**
 * Export convenience function for observing elements
 */
export function observeElements(
  observer: IntersectionObserver,
  elements: NodeListOf<Element> | Element[]
): void {
  IntersectionObserverUtil.observeElements(observer, elements);
}