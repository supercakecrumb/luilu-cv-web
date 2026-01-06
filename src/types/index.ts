/**
 * Type definitions for Luiza Portfolio Website
 */

/**
 * Base component interface
 */
export interface Component {
  init(): void;
  destroy?(): void;
}

/**
 * Navigation state
 */
export interface NavigationState {
  isOpen: boolean;
  activeSection: string;
  isScrolled: boolean;
}

/**
 * Section configuration
 */
export interface SectionConfig {
  id: string;
  title: string;
  element?: HTMLElement;
}

/**
 * Work project data structure
 */
export interface WorkProject {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  link?: string;
}

/**
 * Experience entry data structure
 */
export interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  period: {
    start: string;
    end: string;
  };
  description: string;
  skills: string[];
}

/**
 * Education entry data structure
 */
export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: {
    start: string;
    end: string;
  };
}

/**
 * Tool entry data structure
 */
export interface ToolEntry {
  id: string;
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
  iconUrl?: string;
}

/**
 * Contact method data structure
 */
export interface ContactMethod {
  type: 'email' | 'phone' | 'location' | 'social';
  label: string;
  value: string;
  link?: string;
  icon?: string;
}

/**
 * Form data structure
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

/**
 * Animation observer options
 */
export interface AnimationObserverOptions {
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
}

/**
 * Scroll position data
 */
export interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down';
}

/**
 * Viewport data
 */
export interface ViewportData {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}