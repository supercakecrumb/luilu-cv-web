/**
 * Contacts Component
 * Handles contacts section and form functionality, including copy-to-clipboard
 */

import type { Component } from '../types';
import { DOM } from '../utils/dom';
import { CONTACT_INFO } from '../utils/constants';

export class ContactsComponent implements Component {
  private element: HTMLElement | null = null;
  private emailLink: HTMLAnchorElement | null = null;
  private form: HTMLFormElement | null = null;
  private tooltip: HTMLElement | null = null;

  constructor() {
    this.element = DOM.select<HTMLElement>('#contacts');
    this.emailLink = DOM.select<HTMLAnchorElement>('a[href^="mailto:"]');
    this.form = DOM.select<HTMLFormElement>('.contact-form');
  }

  /**
   * Initialize contacts component
   */
  public init(): void {
    if (!this.element) {
      console.warn('Contacts element not found');
      return;
    }

    this.setupContactLinks();
    this.setupCopyToClipboard();
    this.setupFormHandling();
    this.createTooltip();

    console.log('Contacts component initialized');
  }

  /**
   * Setup contact links with analytics
   */
  private setupContactLinks(): void {
    // Track email clicks
    if (this.emailLink) {
      DOM.on(this.emailLink, 'click', () => {
        this.trackContactMethod('email', CONTACT_INFO.EMAIL);
      });
    }

    // Track phone clicks
    const phoneLinks = DOM.selectAll<HTMLAnchorElement>('a[href^="tel:"]');
    phoneLinks.forEach((link) => {
      DOM.on(link, 'click', () => {
        const phone = link.getAttribute('href')?.replace('tel:', '') || '';
        this.trackContactMethod('phone', phone);
      });
    });

    // Track social media clicks
    const socialLinks = DOM.selectAll<HTMLAnchorElement>('.social-link');
    socialLinks.forEach((link) => {
      DOM.on(link, 'click', () => {
        const platform = link.getAttribute('aria-label') || 'social';
        this.trackContactMethod('social', platform);
      });
    });
  }

  /**
   * Setup copy-to-clipboard functionality
   */
  private setupCopyToClipboard(): void {
    // Add click handler to email for copy functionality
    const emailElements = DOM.selectAll<HTMLElement>('.contact-method__value');
    
    emailElements.forEach((element) => {
      const text = element.textContent?.trim();
      
      // Only add copy functionality for email addresses
      if (text && text.includes('@')) {
        // Make element look clickable
        element.style.cursor = 'pointer';
        element.title = 'Нажмите, чтобы скопировать';

        DOM.on(element, 'click', (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          this.copyToClipboard(text, element);
        });
      }
    });
  }

  /**
   * Copy text to clipboard
   */
  private async copyToClipboard(text: string, element: HTMLElement): Promise<void> {
    try {
      // Modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        this.showCopySuccess(element);
      } else {
        // Fallback for older browsers
        this.copyToClipboardFallback(text);
        this.showCopySuccess(element);
      }

      // Track copy action
      console.log('Text copied to clipboard:', text);
    } catch (err) {
      console.error('Failed to copy text:', err);
      this.showCopyError(element);
    }
  }

  /**
   * Fallback copy method for older browsers
   */
  private copyToClipboardFallback(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      textArea.remove();
    } catch (err) {
      console.error('Fallback copy failed:', err);
      textArea.remove();
      throw err;
    }
  }

  /**
   * Create tooltip element
   */
  private createTooltip(): void {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'copy-tooltip';
    this.tooltip.style.cssText = `
      position: fixed;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 9999;
    `;
    document.body.appendChild(this.tooltip);
  }

  /**
   * Show copy success tooltip
   */
  private showCopySuccess(element: HTMLElement): void {
    if (!this.tooltip) return;

    this.tooltip.textContent = '✓ Скопировано!';
    this.tooltip.style.backgroundColor = 'rgba(40, 167, 69, 0.9)';
    this.showTooltip(element);
  }

  /**
   * Show copy error tooltip
   */
  private showCopyError(element: HTMLElement): void {
    if (!this.tooltip) return;

    this.tooltip.textContent = '✗ Ошибка копирования';
    this.tooltip.style.backgroundColor = 'rgba(220, 53, 69, 0.9)';
    this.showTooltip(element);
  }

  /**
   * Show tooltip near element
   */
  private showTooltip(element: HTMLElement): void {
    if (!this.tooltip) return;

    const rect = element.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();

    // Position tooltip above element
    this.tooltip.style.left = `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`;
    this.tooltip.style.top = `${rect.top - tooltipRect.height - 10}px`;
    this.tooltip.style.opacity = '1';

    // Hide after 2 seconds
    setTimeout(() => {
      if (this.tooltip) {
        this.tooltip.style.opacity = '0';
      }
    }, 2000);
  }

  /**
   * Setup form handling
   */
  private setupFormHandling(): void {
    if (!this.form) return;

    DOM.on(this.form, 'submit', (e: Event) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    // Add real-time validation
    const inputs = this.form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input, textarea'
    );
    inputs.forEach((input) => {
      DOM.on(input, 'blur', () => {
        this.validateField(input);
      });

      DOM.on(input, 'input', () => {
        // Clear error on input
        if (input.classList.contains('error')) {
          input.classList.remove('error');
          const errorMsg = input.parentElement?.querySelector('.error-message');
          if (errorMsg) {
            errorMsg.remove();
          }
        }
      });
    });
  }

  /**
   * Validate form field
   */
  private validateField(field: HTMLInputElement | HTMLTextAreaElement): boolean {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Required field check
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Это поле обязательно для заполнения';
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Введите корректный email адрес';
      }
    }

    // Show error if invalid
    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  /**
   * Show field error message
   */
  private showFieldError(field: HTMLInputElement | HTMLTextAreaElement, message: string): void {
    field.classList.add('error');

    // Remove existing error message
    const existingError = field.parentElement?.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      color: #dc3545;
      font-size: 12px;
      margin-top: 4px;
    `;
    field.parentElement?.appendChild(errorDiv);
  }

  /**
   * Handle form submission
   */
  private async handleFormSubmit(): Promise<void> {
    if (!this.form) return;

    // Validate all fields
    const inputs = this.form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input[required], textarea[required]'
    );
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      console.log('Form validation failed');
      return;
    }

    // Get form data
    const formData = new FormData(this.form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    console.log('Form submitted:', data);

    // Here you would normally send the data to a server
    // For now, just show success message
    this.showFormSuccess();
  }

  /**
   * Show form success message
   */
  private showFormSuccess(): void {
    if (!this.form) return;

    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.textContent = '✓ Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
    successDiv.style.cssText = `
      background-color: #d4edda;
      color: #155724;
      padding: 16px;
      border-radius: 8px;
      margin-top: 16px;
      border: 1px solid #c3e6cb;
    `;

    this.form.appendChild(successDiv);

    // Reset form
    this.form.reset();

    // Remove success message after 5 seconds
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }

  /**
   * Track contact method usage (for analytics)
   */
  private trackContactMethod(method: string, value: string): void {
    console.log('Contact method used:', { method, value });

    // Dispatch custom event for analytics
    this.element?.dispatchEvent(
      new CustomEvent('contactMethodUsed', {
        detail: { method, value },
      })
    );
  }

  /**
   * Clean up and destroy component
   */
  public destroy(): void {
    // Remove tooltip
    if (this.tooltip && this.tooltip.parentNode) {
      this.tooltip.parentNode.removeChild(this.tooltip);
    }

    console.log('Contacts component destroyed');
  }
}