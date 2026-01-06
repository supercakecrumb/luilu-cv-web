/**
 * Animation Utility Functions
 * Helper functions for animations and transitions
 */

import { SCROLL_CONFIG } from './constants';

export const Animations = {
  /**
   * Smooth scroll to element
   */
  scrollTo: (element: HTMLElement, offset: number = SCROLL_CONFIG.SMOOTH_OFFSET): void => {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  },

  /**
   * Smooth scroll to specific Y position
   */
  scrollToPosition: (top: number, behavior: ScrollBehavior = 'smooth'): void => {
    window.scrollTo({
      top,
      behavior,
    });
  },

  /**
   * Fade in element with animation
   */
  fadeIn: (element: HTMLElement, duration: number = 300): Promise<void> => {
    return new Promise((resolve) => {
      element.style.opacity = '0';
      element.style.display = 'block';

      let start: number | null = null;

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.min(progress / duration, 1);

        element.style.opacity = opacity.toString();

        if (progress < duration) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  },

  /**
   * Fade out element with animation
   */
  fadeOut: (element: HTMLElement, duration: number = 300): Promise<void> => {
    return new Promise((resolve) => {
      let start: number | null = null;
      const startOpacity = parseFloat(getComputedStyle(element).opacity);

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.max(startOpacity * (1 - progress / duration), 0);

        element.style.opacity = opacity.toString();

        if (progress < duration) {
          requestAnimationFrame(animate);
        } else {
          element.style.display = 'none';
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  },

  /**
   * Calculate stagger animation delay
   */
  staggerDelay: (index: number, baseDelay: number = 100): number => {
    return index * baseDelay;
  },

  /**
   * Apply stagger animation to multiple elements
   */
  applyStagger: (
    elements: NodeListOf<Element> | Element[],
    className: string,
    baseDelay: number = 100
  ): void => {
    elements.forEach((element, index) => {
      const delay = Animations.staggerDelay(index, baseDelay);
      (element as HTMLElement).style.animationDelay = `${delay}ms`;
      element.classList.add(className);
    });
  },

  /**
   * Easing functions for animations
   */
  easing: {
    linear: (t: number): number => t,
    easeInQuad: (t: number): number => t * t,
    easeOutQuad: (t: number): number => t * (2 - t),
    easeInOutQuad: (t: number): number => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    easeInCubic: (t: number): number => t * t * t,
    easeOutCubic: (t: number): number => --t * t * t + 1,
    easeInOutCubic: (t: number): number =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  },

  /**
   * Debounce function execution
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        timeout = null;
        func(...args);
      };

      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle function execution
   */
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;

    return function executedFunction(...args: Parameters<T>) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * Request animation frame with fallback
   */
  requestAnimFrame: (() => {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      ((callback: FrameRequestCallback) => window.setTimeout(callback, 1000 / 60))
    );
  })(),

  /**
   * Cancel animation frame with fallback
   */
  cancelAnimFrame: (() => {
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      ((id: number) => clearTimeout(id))
    );
  })(),
};

// Type augmentation for webkit prefixed methods
declare global {
  interface Window {
    webkitRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
    webkitCancelAnimationFrame?: (handle: number) => void;
  }
}