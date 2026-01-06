import { i18n } from '../i18n/i18n';

export class TranslationUpdater {
  constructor() {
    this.init();
  }
  
  private init(): void {
    // Listen for language change events
    window.addEventListener('languagechange', () => {
      this.updateAllTranslations();
    });
    
    // Initial update
    this.updateAllTranslations();
  }
  
  private updateAllTranslations(): void {
    // Update elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = i18n.t(key);
      }
    });
    
    // Update elements with data-i18n-html (allows HTML like <br>)
    const htmlElements = document.querySelectorAll('[data-i18n-html]');
    htmlElements.forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (key) {
        const translation = i18n.t(key);
        (el as HTMLElement).innerHTML = translation.replace(/\\n/g, '<br>');
      }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        (el as HTMLInputElement).placeholder = i18n.t(key);
      }
    });
  }
}