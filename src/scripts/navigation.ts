/**
 * Navigation Module
 * Handles navigation menu interactions, smooth scrolling, and active section tracking
 */

import { DOM } from '../utils/dom';
import { Animations } from '../utils/animations';
import { IntersectionObserverUtil } from './intersection-observer';
import { SCROLL_CONFIG, CSS_CLASSES } from '../utils/constants';

/**
 * Navigation Class
 */
export class Navigation {
  private header: HTMLElement | null;
  private navLinks: NodeListOf<HTMLAnchorElement>;
  private sections: NodeListOf<HTMLElement>;
  private lastScrollY: number = 0;
  private ticking: boolean = false;
  private sectionObserver: IntersectionObserver | null = null;

  constructor() {
    this.header = DOM.select<HTMLElement>('.header');
    this.navLinks = DOM.selectAll<HTMLAnchorElement>('.navigation__link');
    this.sections = DOM.selectAll<HTMLElement>('section[id]');

    this.init();
  }

  /**
   * Initialize navigation
   */
  private init(): void {
    if (!this.header) {
      console.warn('Header element not found');
      return;
    }

    this.setupSmoothScroll();
    this.trackActiveSection();
    this.handleScrollDirection();
    this.setupLogoClick();

    console.log('Navigation initialized');
  }

  /**
   * Setup smooth scrolling for navigation links
   */
  private setupSmoothScroll(): void {
    this.navLinks.forEach((link) => {
      DOM.on(link, 'click', (e: Event) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;

        const targetSection = DOM.select<HTMLElement>(targetId);
        if (targetSection) {
          // Scroll to section
          Animations.scrollTo(targetSection, SCROLL_CONFIG.SMOOTH_OFFSET);

          // Update URL hash without triggering scroll
          this.updateHash(targetId);

          // Update active link
          this.setActiveLink(targetId);
        }
      });
    });
  }

  /**
   * Setup logo click to scroll to top
   */
  private setupLogoClick(): void {
    const logo = DOM.select<HTMLAnchorElement>('.navigation__logo a');
    if (logo) {
      DOM.on(logo, 'click', (e: Event) => {
        e.preventDefault();
        Animations.scrollToPosition(0);
        this.updateHash('#hero');
        this.clearActiveLinks();
      });
    }
  }

  /**
   * Track active section using Intersection Observer
   */
  private trackActiveSection(): void {
    if (!IntersectionObserverUtil.isSupported()) {
      console.warn('IntersectionObserver not supported');
      return;
    }

    this.sectionObserver = IntersectionObserverUtil.createSectionObserver(
      (sectionId: string) => {
        this.setActiveLink(`#${sectionId}`);
        this.updateHash(`#${sectionId}`);
      }
    );

    // Observe all sections
    this.sections.forEach((section) => {
      if (this.sectionObserver) {
        this.sectionObserver.observe(section);
      }
    });
  }

  /**
   * Set active navigation link
   */
  private setActiveLink(targetId: string): void {
    // Remove active class from all links
    this.navLinks.forEach((link) => {
      DOM.removeClass(link, CSS_CLASSES.ACTIVE);
    });

    // Add active class to matching link
    this.navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === targetId) {
        DOM.addClass(link, CSS_CLASSES.ACTIVE);
      }
    });
  }

  /**
   * Clear all active links
   */
  private clearActiveLinks(): void {
    this.navLinks.forEach((link) => {
      DOM.removeClass(link, CSS_CLASSES.ACTIVE);
    });
  }

  /**
   * Update URL hash without triggering scroll
   */
  private updateHash(hash: string): void {
    if (history.pushState) {
      history.pushState(null, '', hash);
    } else {
      // Fallback for older browsers
      window.location.hash = hash;
    }
  }

  /**
   * Handle scroll direction to show/hide header
   */
  private handleScrollDirection(): void {
    const scrollHandler = () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.updateHeaderVisibility();
          this.ticking = false;
        });
        this.ticking = true;
      }
    };

    // Use throttled scroll handler
    const throttledScroll = Animations.throttle(scrollHandler, 100);
    DOM.on(window, 'scroll', throttledScroll);
  }

  /**
   * Update header visibility based on scroll direction
   */
  private updateHeaderVisibility(): void {
    if (!this.header) return;

    const currentScrollY = window.pageYOffset;

    // Don't hide header at top of page
    if (currentScrollY < SCROLL_CONFIG.THRESHOLD) {
      DOM.removeClass(this.header, CSS_CLASSES.HIDDEN);
      DOM.removeClass(this.header, CSS_CLASSES.SCROLLED);
      this.lastScrollY = currentScrollY;
      return;
    }

    // Add scrolled class when scrolled
    if (currentScrollY > SCROLL_CONFIG.THRESHOLD) {
      DOM.addClass(this.header, CSS_CLASSES.SCROLLED);
    }

    // Hide header when scrolling down, show when scrolling up
    if (currentScrollY > this.lastScrollY && currentScrollY > SCROLL_CONFIG.THRESHOLD) {
      // Scrolling down
      DOM.addClass(this.header, CSS_CLASSES.HIDDEN);
    } else if (currentScrollY < this.lastScrollY) {
      // Scrolling up
      DOM.removeClass(this.header, CSS_CLASSES.HIDDEN);
    }

    this.lastScrollY = currentScrollY;
  }

  /**
   * Handle hash on page load
   */
  public handleInitialHash(): void {
    const hash = window.location.hash;
    if (hash) {
      const targetSection = DOM.select<HTMLElement>(hash);
      if (targetSection) {
        // Small delay to ensure page is loaded
        setTimeout(() => {
          Animations.scrollTo(targetSection, SCROLL_CONFIG.SMOOTH_OFFSET);
          this.setActiveLink(hash);
        }, 100);
      }
    }
  }

  /**
   * Destroy navigation and clean up
   */
  public destroy(): void {
    // Disconnect observer
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }

    console.log('Navigation destroyed');
  }
}