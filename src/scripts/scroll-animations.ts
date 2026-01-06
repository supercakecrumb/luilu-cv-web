/**
 * Scroll Animations Module
 * Handles scroll-based animations including fade-in, stagger, and parallax effects
 */

import { DOM } from '../utils/dom';
import { Animations } from '../utils/animations';
import { IntersectionObserverUtil } from './intersection-observer';
import { CSS_CLASSES } from '../utils/constants';

/**
 * Scroll Animations Class
 */
export class ScrollAnimations {
  private observer: IntersectionObserver | null = null;
  private prefersReducedMotion: boolean;
  private heroSection: HTMLElement | null;
  private parallaxElements: NodeListOf<Element>;
  private ticking: boolean = false;

  constructor() {
    // Check if user prefers reduced motion
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.heroSection = DOM.select<HTMLElement>('#hero');
    this.parallaxElements = DOM.selectAll('.parallax-element');

    this.init();
  }

  /**
   * Initialize scroll animations
   */
  private init(): void {
    if (this.prefersReducedMotion) {
      console.log('Reduced motion preference detected - animations disabled');
      return;
    }

    this.setupObserver();
    this.setupParallax();

    console.log('Scroll animations initialized');
  }

  /**
   * Setup Intersection Observer for animations
   */
  private setupObserver(): void {
    if (!IntersectionObserverUtil.isSupported()) {
      console.warn('IntersectionObserver not supported - animations disabled');
      return;
    }

    // Create observer for fade-in animations
    this.observer = IntersectionObserverUtil.createAnimationObserver(CSS_CLASSES.VISIBLE, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px',
      once: true,
    });
  }

  /**
   * Observe elements for animations
   */
  public observe(elements: NodeListOf<Element> | Element[]): void {
    if (this.prefersReducedMotion || !this.observer) {
      // Skip animations if user prefers reduced motion
      return;
    }

    const elementsArray = Array.isArray(elements) ? elements : Array.from(elements);
    
    elementsArray.forEach((element, index) => {
      // Add stagger delay for elements with stagger class
      if (DOM.hasClass(element, 'stagger-item')) {
        const delay = Animations.staggerDelay(index, 100);
        (element as HTMLElement).style.transitionDelay = `${delay}ms`;
      }

      // Observe element
      if (this.observer) {
        this.observer.observe(element);
      }
    });
  }

  /**
   * Setup parallax effect for hero section
   */
  private setupParallax(): void {
    if (!this.heroSection && this.parallaxElements.length === 0) {
      return;
    }

    const handleScroll = () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.updateParallax();
          this.ticking = false;
        });
        this.ticking = true;
      }
    };

    // Use throttled scroll handler for performance
    const throttledScroll = Animations.throttle(handleScroll, 16); // ~60fps
    DOM.on(window, 'scroll', throttledScroll);
  }

  /**
   * Update parallax effects
   */
  private updateParallax(): void {
    const scrollY = window.pageYOffset;

    // Apply parallax to hero section
    if (this.heroSection) {
      const heroHeight = this.heroSection.offsetHeight;
      
      // Only apply parallax when hero is visible
      if (scrollY < heroHeight) {
        const parallaxSpeed = 0.5;
        const yPos = scrollY * parallaxSpeed;
        
        // Apply transform to hero content
        const heroContent = this.heroSection.querySelector('.hero__content') as HTMLElement;
        if (heroContent) {
          heroContent.style.transform = `translateY(${yPos}px)`;
        }

        // Apply opacity fade
        const opacity = 1 - (scrollY / heroHeight) * 0.8;
        this.heroSection.style.opacity = Math.max(opacity, 0.2).toString();
      }
    }

    // Apply parallax to other elements
    this.parallaxElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementHeight = element.clientHeight;
      const windowHeight = window.innerHeight;

      // Check if element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollProgress = (scrollY + windowHeight - elementTop) / (windowHeight + elementHeight);
        const parallaxSpeed = parseFloat((element as HTMLElement).dataset.parallaxSpeed || '0.3');
        const yPos = (scrollProgress - 0.5) * 100 * parallaxSpeed;

        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      }
    });
  }

  /**
   * Animate element in
   */
  public animateIn(element: Element, delay: number = 0): void {
    if (this.prefersReducedMotion) {
      DOM.addClass(element, CSS_CLASSES.VISIBLE);
      return;
    }

    setTimeout(() => {
      DOM.addClass(element, CSS_CLASSES.VISIBLE);
    }, delay);
  }

  /**
   * Animate multiple elements with stagger
   */
  public animateStagger(elements: NodeListOf<Element> | Element[], baseDelay: number = 100): void {
    if (this.prefersReducedMotion) {
      elements.forEach((element) => {
        DOM.addClass(element, CSS_CLASSES.VISIBLE);
      });
      return;
    }

    const elementsArray = Array.isArray(elements) ? elements : Array.from(elements);
    
    elementsArray.forEach((element, index) => {
      const delay = Animations.staggerDelay(index, baseDelay);
      this.animateIn(element, delay);
    });
  }

  /**
   * Add fade-in class to element
   */
  public addFadeIn(element: Element): void {
    DOM.addClass(element, CSS_CLASSES.FADE_IN);
  }

  /**
   * Reset animations (for development/testing)
   */
  public reset(): void {
    const animatedElements = DOM.selectAll(`.${CSS_CLASSES.VISIBLE}`);
    animatedElements.forEach((element) => {
      DOM.removeClass(element, CSS_CLASSES.VISIBLE);
    });
  }

  /**
   * Destroy scroll animations and clean up
   */
  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    console.log('Scroll animations destroyed');
  }
}

/**
 * Helper function to add animation classes to elements in HTML
 */
export function setupAnimationClasses(): void {
  // Add fade-in class to sections
  const sections = DOM.selectAll('section');
  sections.forEach((section) => {
    DOM.addClass(section, 'fade-in');
  });

  // Add fade-in to cards
  const cards = DOM.selectAll('.work-card, .experience-card, .education-card, .tool-card');
  cards.forEach((card) => {
    DOM.addClass(card, 'fade-in');
  });

  // Add stagger to work category buttons
  const filterButtons = DOM.selectAll('.filter-btn');
  filterButtons.forEach((btn) => {
    DOM.addClass(btn, 'stagger-item');
  });

  // Add stagger to skill badges
  const skillBadges = DOM.selectAll('.skill-badge');
  skillBadges.forEach((badge) => {
    DOM.addClass(badge, 'stagger-item');
  });

  // Add stagger to stat cards
  const statCards = DOM.selectAll('.stat-card');
  statCards.forEach((card) => {
    DOM.addClass(card, 'stagger-item');
  });

  console.log('Animation classes added to elements');
}