import { translations, Language, Translations } from './translations';

export class I18n {
  private currentLanguage: Language;
  private translations: typeof translations;
  
  constructor() {
    // Get saved language or default to Russian
    const saved = localStorage.getItem('language') as Language;
    this.currentLanguage = saved || 'ru';
    this.translations = translations;
  }
  
  public getCurrentLanguage(): Language {
    return this.currentLanguage;
  }
  
  public setLanguage(lang: Language): void {
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    this.updatePageContent();
  }
  
  public t(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      value = value[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return value;
  }
  
  public getTranslations(): Translations {
    return this.translations[this.currentLanguage];
  }
  
  private updatePageContent(): void {
    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languagechange', {
      detail: { language: this.currentLanguage }
    }));
  }
  
  public switchLanguage(): void {
    const newLang = this.currentLanguage === 'ru' ? 'en' : 'ru';
    this.setLanguage(newLang);
  }
}

// Export singleton instance
export const i18n = new I18n();