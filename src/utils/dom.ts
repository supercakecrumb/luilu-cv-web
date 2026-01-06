/**
 * DOM Utility Functions
 * Helper functions for DOM manipulation
 */

export const DOM = {
  /**
   * Select a single element
   */
  select: <T extends Element>(selector: string): T | null => {
    return document.querySelector<T>(selector);
  },

  /**
   * Select all matching elements
   */
  selectAll: <T extends Element>(selector: string): NodeListOf<T> => {
    return document.querySelectorAll<T>(selector);
  },

  /**
   * Add a class to an element
   */
  addClass: (element: Element, className: string): void => {
    element.classList.add(className);
  },

  /**
   * Remove a class from an element
   */
  removeClass: (element: Element, className: string): void => {
    element.classList.remove(className);
  },

  /**
   * Toggle a class on an element
   */
  toggleClass: (element: Element, className: string): void => {
    element.classList.toggle(className);
  },

  /**
   * Check if element has a class
   */
  hasClass: (element: Element, className: string): boolean => {
    return element.classList.contains(className);
  },

  /**
   * Get element's offset from top of page
   */
  getOffsetTop: (element: HTMLElement): number => {
    let offsetTop = 0;
    let currentElement: HTMLElement | null = element;

    while (currentElement) {
      offsetTop += currentElement.offsetTop;
      currentElement = currentElement.offsetParent as HTMLElement | null;
    }

    return offsetTop;
  },

  /**
   * Check if element is in viewport
   */
  isInViewport: (element: Element, offset: number = 0): boolean => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= -offset &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Add event listener with options
   */
  on: <K extends keyof HTMLElementEventMap>(
    element: Element | Window | Document,
    event: K | string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void => {
    element.addEventListener(event, handler, options);
  },

  /**
   * Remove event listener
   */
  off: <K extends keyof HTMLElementEventMap>(
    element: Element | Window | Document,
    event: K | string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void => {
    element.removeEventListener(event, handler, options);
  },
};