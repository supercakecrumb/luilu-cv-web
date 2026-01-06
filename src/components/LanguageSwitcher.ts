import { i18n } from '../i18n/i18n';
import { DOM } from '../utils/dom';

export class LanguageSwitcher {
  private button: HTMLElement | null;
  
  constructor() {
    this.button = DOM.select('.language-switcher');
    if (this.button) {
      this.setupSwitcher();
      this.updateButtonText();
    }
  }
  
  private setupSwitcher(): void {
    if (!this.button) return;
    
    this.button.addEventListener('click', () => {
      i18n.switchLanguage();
      this.updateButtonText();
      this.animateSwitch();
    });
  }
  
  private updateButtonText(): void {
    if (!this.button) return;
    const lang = i18n.getCurrentLanguage();
    this.button.textContent = lang.toUpperCase();
    this.button.setAttribute('title', i18n.t('language.switch'));
  }
  
  private animateSwitch(): void {
    if (!this.button) return;
    this.button.classList.add('switching');
    setTimeout(() => {
      this.button?.classList.remove('switching');
    }, 300);
  }
}