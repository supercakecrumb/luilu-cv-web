/**
 * Works Component
 * Handles works/portfolio section functionality including category filtering
 */

import type { Component } from '../types';
import { DOM } from '../utils/dom';
import { CSS_CLASSES } from '../utils/constants';

export class WorksComponent implements Component {
  private element: HTMLElement | null = null;
  private filterButtons: NodeListOf<HTMLElement>;
  private workCards: NodeListOf<HTMLElement>;
  private activeCategory: string = 'all';

  constructor() {
    this.element = DOM.select<HTMLElement>('#works');
    this.filterButtons = DOM.selectAll<HTMLElement>('.filter-btn');
    this.workCards = DOM.selectAll<HTMLElement>('.work-card');
  }

  /**
   * Initialize works component
   */
  public init(): void {
    if (!this.element) {
      console.warn('Works element not found');
      return;
    }

    this.setupCategoryFiltering();
    this.setupCardInteractions();

    console.log('Works component initialized');
  }

  /**
   * Setup category filtering functionality
   */
  private setupCategoryFiltering(): void {
    this.filterButtons.forEach((button) => {
      DOM.on(button, 'click', () => {
        const category = button.dataset.filter || 'all';
        this.filterByCategory(category);
        this.setActiveFilter(button);
      });
    });
  }

  /**
   * Filter work cards by category
   */
  private filterByCategory(category: string): void {
    this.activeCategory = category;

    this.workCards.forEach((card) => {
      const cardCategory = card.dataset.category;

      if (category === 'all' || cardCategory === category) {
        this.showCard(card);
      } else {
        this.hideCard(card);
      }
    });

    // Dispatch custom event for analytics or other components
    this.element?.dispatchEvent(
      new CustomEvent('categoryChanged', {
        detail: { category },
      })
    );
  }

  /**
   * Show work card with animation
   */
  private showCard(card: HTMLElement): void {
    card.style.display = '';
    
    // Force reflow
    void card.offsetHeight;
    
    // Add visible class
    setTimeout(() => {
      DOM.addClass(card, CSS_CLASSES.VISIBLE);
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
    }, 10);
  }

  /**
   * Hide work card with animation
   */
  private hideCard(card: HTMLElement): void {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      card.style.display = 'none';
      DOM.removeClass(card, CSS_CLASSES.VISIBLE);
    }, 300);
  }

  /**
   * Set active filter button
   */
  private setActiveFilter(activeButton: HTMLElement): void {
    // Remove active class from all buttons
    this.filterButtons.forEach((button) => {
      DOM.removeClass(button, 'filter-btn--active');
      button.setAttribute('aria-pressed', 'false');
    });

    // Add active class to clicked button
    DOM.addClass(activeButton, 'filter-btn--active');
    activeButton.setAttribute('aria-pressed', 'true');
  }

  /**
   * Setup card hover and interaction effects
   */
  private setupCardInteractions(): void {
    this.workCards.forEach((card) => {
      // Add hover effect with transform
      DOM.on(card, 'mouseenter', () => {
        this.onCardHover(card, true);
      });

      DOM.on(card, 'mouseleave', () => {
        this.onCardHover(card, false);
      });

      // Handle card click for analytics
      const cardLink = card.querySelector<HTMLAnchorElement>('.work-card__link');
      if (cardLink) {
        DOM.on(cardLink, 'click', (e: Event) => {
          this.onCardClick(card, e);
        });
      }
    });
  }

  /**
   * Handle card hover effect
   */
  private onCardHover(card: HTMLElement, isHovering: boolean): void {
    const image = card.querySelector<HTMLElement>('.work-card__image');
    if (image) {
      if (isHovering) {
        image.style.transform = 'scale(1.05)';
      } else {
        image.style.transform = 'scale(1)';
      }
    }
  }

  /**
   * Handle card click for analytics
   */
  private onCardClick(card: HTMLElement, _event: Event): void {
    const cardTitle = card.querySelector('.work-card__title')?.textContent || 'Unknown';
    const cardCategory = card.dataset.category || 'unknown';

    // Log for analytics (could be replaced with actual analytics call)
    console.log('Work card clicked:', {
      title: cardTitle,
      category: cardCategory,
      activeFilter: this.activeCategory,
    });

    // Dispatch custom event for analytics or other components
    card.dispatchEvent(
      new CustomEvent('workCardClicked', {
        detail: {
          title: cardTitle,
          category: cardCategory,
        },
        bubbles: true,
      })
    );
  }

  /**
   * Get currently active category
   */
  public getActiveCategory(): string {
    return this.activeCategory;
  }

  /**
   * Programmatically filter by category
   */
  public setCategory(category: string): void {
    const button = Array.from(this.filterButtons).find(
      (btn) => btn.dataset.filter === category
    );

    if (button) {
      this.filterByCategory(category);
      this.setActiveFilter(button);
    }
  }

  /**
   * Get visible cards count
   */
  public getVisibleCardsCount(): number {
    return Array.from(this.workCards).filter((card) => card.style.display !== 'none').length;
  }

  /**
   * Reset filters to show all
   */
  public resetFilters(): void {
    this.setCategory('all');
  }

  /**
   * Clean up and destroy component
   */
  public destroy(): void {
    console.log('Works component destroyed');
  }
}