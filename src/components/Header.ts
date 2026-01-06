/**
 * Header Component
 * Handles header and mobile menu functionality
 */

import type { Component, NavigationState } from '../types';
import { DOM } from '../utils/dom';
import { CSS_CLASSES } from '../utils/constants';

export class HeaderComponent implements Component {
  private element: HTMLElement | null = null;
  private mobileMenuBtn: HTMLElement | null = null;
  private mobileMenu: HTMLElement | null = null;
  private overlay: HTMLElement | null = null;
  private isMenuOpen: boolean = false;
  private state: NavigationState = {
    isOpen: false,
    activeSection: 'hero',
    isScrolled: false,
  };

  constructor() {
    this.element = DOM.select<HTMLElement>('.header');
    this.mobileMenuBtn = DOM.select<HTMLElement>('.navigation__toggle');
    this.mobileMenu = DOM.select<HTMLElement>('.navigation__menu');
  }

  /**
   * Initialize header component
   */
  public init(): void {
    if (!this.element) {
      console.warn('Header element not found');
      return;
    }

    this.setupMobileMenu();
    this.setupKeyboardNavigation();
    
    console.log('Header component initialized');
  }

  /**
   * Setup mobile menu functionality
   */
  private setupMobileMenu(): void {
    if (!this.mobileMenuBtn || !this.mobileMenu) {
      return;
    }

    // Toggle menu on button click
    DOM.on(this.mobileMenuBtn, 'click', () => {
      this.toggleMobileMenu();
    });

    // Close menu when clicking on nav links
    const navLinks = this.mobileMenu.querySelectorAll<HTMLAnchorElement>('.navigation__link');
    navLinks.forEach((link) => {
      DOM.on(link, 'click', () => {
        this.closeMobileMenu();
      });
    });

    // Close menu when clicking CTA button
    const ctaButton = DOM.select<HTMLAnchorElement>('.navigation__cta a');
    if (ctaButton) {
      DOM.on(ctaButton, 'click', () => {
        this.closeMobileMenu();
      });
    }

    // Create and setup overlay
    this.createOverlay();

    // Handle window resize
    DOM.on(window, 'resize', () => {
      // Close mobile menu on desktop
      if (window.innerWidth >= 768 && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  /**
   * Create overlay for mobile menu
   */
  private createOverlay(): void {
    this.overlay = document.createElement('div');
    this.overlay.className = 'mobile-menu-overlay';
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
      z-index: 998;
    `;

    document.body.appendChild(this.overlay);

    // Close menu when clicking overlay
    DOM.on(this.overlay, 'click', () => {
      this.closeMobileMenu();
    });
  }

  /**
   * Toggle mobile menu
   */
  private toggleMobileMenu(): void {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  /**
   * Open mobile menu
   */
  private openMobileMenu(): void {
    if (!this.mobileMenuBtn || !this.mobileMenu || !this.overlay) {
      return;
    }

    this.isMenuOpen = true;
    this.state.isOpen = true;

    // Update button state
    this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
    DOM.addClass(this.mobileMenuBtn, CSS_CLASSES.ACTIVE);

    // Show menu
    DOM.addClass(this.mobileMenu, CSS_CLASSES.ACTIVE);

    // Show overlay
    this.overlay.style.opacity = '1';
    this.overlay.style.visibility = 'visible';

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Focus first menu item
    const firstLink = this.mobileMenu.querySelector<HTMLAnchorElement>('.navigation__link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  /**
   * Close mobile menu
   */
  private closeMobileMenu(): void {
    if (!this.mobileMenuBtn || !this.mobileMenu || !this.overlay) {
      return;
    }

    this.isMenuOpen = false;
    this.state.isOpen = false;

    // Update button state
    this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
    DOM.removeClass(this.mobileMenuBtn, CSS_CLASSES.ACTIVE);

    // Hide menu
    DOM.removeClass(this.mobileMenu, CSS_CLASSES.ACTIVE);

    // Hide overlay
    this.overlay.style.opacity = '0';
    this.overlay.style.visibility = 'hidden';

    // Restore body scroll
    document.body.style.overflow = '';
  }

  /**
   * Setup keyboard navigation
   */
  private setupKeyboardNavigation(): void {
    // Close menu on Escape key
    DOM.on(document, 'keydown', (e: Event) => {
      const event = e as KeyboardEvent;
      if (event.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
        // Focus the menu button
        if (this.mobileMenuBtn) {
          (this.mobileMenuBtn as HTMLElement).focus();
        }
      }
    });

    // Trap focus within mobile menu when open
    if (this.mobileMenu) {
      DOM.on(this.mobileMenu, 'keydown', (e: Event) => {
        if (!this.isMenuOpen) return;

        const event = e as KeyboardEvent;
        if (event.key === 'Tab') {
          this.handleTabKey(event);
        }
      });
    }
  }

  /**
   * Handle Tab key for focus trapping
   */
  private handleTabKey(event: KeyboardEvent): void {
    if (!this.mobileMenu) return;

    const focusableElements = this.mobileMenu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // If Shift+Tab on first element, focus last
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
    // If Tab on last element, focus first
    else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  /**
   * Get current state
   */
  public getState(): NavigationState {
    return { ...this.state };
  }

  /**
   * Clean up and destroy component
   */
  public destroy(): void {
    // Remove overlay
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }

    // Restore body scroll if menu was open
    if (this.isMenuOpen) {
      document.body.style.overflow = '';
    }

    console.log('Header component destroyed');
  }
}