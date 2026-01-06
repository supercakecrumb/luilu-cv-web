/**
 * Application constants for Luiza Portfolio Website
 */

/**
 * Section IDs for navigation and scrolling
 */
export const SECTION_IDS = {
  HERO: 'hero',
  ABOUT: 'about',
  WORKS: 'works',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  CONTACTS: 'contacts',
} as const;

/**
 * Navigation menu items
 */
export const NAV_LINKS = [
  { id: SECTION_IDS.ABOUT, label: 'Обо мне', href: '#about' },
  { id: SECTION_IDS.WORKS, label: 'Работы', href: '#works' },
  { id: SECTION_IDS.EXPERIENCE, label: 'Опыт', href: '#experience' },
  { id: SECTION_IDS.EDUCATION, label: 'Образование', href: '#education' },
  { id: SECTION_IDS.CONTACTS, label: 'Контакты', href: '#contacts' },
] as const;

/**
 * Breakpoint values (in pixels)
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  INSTANT: 100,
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

/**
 * Scroll behavior configuration
 */
export const SCROLL_CONFIG = {
  THRESHOLD: 100, // Pixels to scroll before changing header state
  SMOOTH_OFFSET: 80, // Offset for smooth scroll to sections
} as const;

/**
 * Intersection Observer configuration
 */
export const OBSERVER_CONFIG = {
  THRESHOLD: 0.15, // 15% of element must be visible
  ROOT_MARGIN: '-80px', // Offset from viewport
} as const;

/**
 * Work filter categories
 */
export const WORK_CATEGORIES = {
  ALL: 'all',
  BRANDING: 'branding',
  WEB: 'web',
  MOBILE: 'mobile',
  UX: 'ux',
} as const;

/**
 * Form validation rules
 */
export const VALIDATION_RULES = {
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 1000,
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  THEME: 'luiza-portfolio-theme',
  LANGUAGE: 'luiza-portfolio-language',
} as const;

/**
 * CSS class names
 */
export const CSS_CLASSES = {
  ACTIVE: 'active',
  HIDDEN: 'hidden',
  VISIBLE: 'visible',
  SCROLLED: 'scrolled',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
  FADE_IN: 'fade-in',
} as const;

/**
 * Debounce delays (in milliseconds)
 */
export const DEBOUNCE_DELAY = {
  SCROLL: 150,
  RESIZE: 250,
  INPUT: 300,
} as const;

/**
 * API endpoints (placeholder - to be configured)
 */
export const API_ENDPOINTS = {
  CONTACT_FORM: '/api/contact',
  NEWSLETTER: '/api/newsletter',
} as const;

/**
 * Social media links (placeholder - to be configured)
 */
export const SOCIAL_LINKS = {
  TELEGRAM: '#',
  BEHANCE: '#',
  LINKEDIN: '#',
  INSTAGRAM: '#',
} as const;

/**
 * Contact information (placeholder - to be configured)
 */
export const CONTACT_INFO = {
  EMAIL: 'hello@luiza.design',
  PHONE: '+7 900 123-45-67',
  LOCATION: 'Москва, Россия',
} as const;