/**
 * Main application entry point for Luiza Portfolio Website
 * Phase 5: TypeScript Interactivity Implementation
 */

// Import main CSS
import './styles/main.css';

// Import types
import type { Component } from './types';

// Import constants
import { CSS_CLASSES } from './utils/constants';

// Import scripts
import { Navigation } from './scripts/navigation';
import { ScrollAnimations, setupAnimationClasses } from './scripts/scroll-animations';
import { ImageLazyLoader } from './scripts/image-lazy-load';
import { IntersectionObserverUtil } from './scripts/intersection-observer';

// Import components
import { HeaderComponent } from './components/Header';
import { WorksComponent } from './components/Works';
import { ContactsComponent } from './components/Contacts';

/**
 * Main application class
 */
class App {
  private components: Map<string, Component> = new Map();
  private navigation: Navigation | null = null;
  private scrollAnimations: ScrollAnimations | null = null;
  private imageLazyLoader: ImageLazyLoader | null = null;

  constructor() {
    console.log('🎨 Luiza Portfolio - Initializing...');
    this.init();
  }

  /**
   * Initialize the application
   */
  private init(): void {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }
  }

  /**
   * Called when DOM is ready
   */
  private onDOMReady(): void {
    console.log('📦 DOM Ready - Starting initialization...');

    // Remove loading class from body if present
    document.body.classList.remove(CSS_CLASSES.LOADING);

    // Check browser support
    this.checkBrowserSupport();

    // Setup animation classes first
    setupAnimationClasses();

    // Initialize all modules in order
    this.initializeNavigation();
    this.initializeAnimations();
    this.initializeImages();
    this.initializeComponents();

    // Log environment info
    this.logEnvironmentInfo();

    console.log('✨ Luiza Portfolio - Ready!');
    console.log('🚀 All interactive features initialized');
  }

  /**
   * Check browser support for required features
   */
  private checkBrowserSupport(): void {
    // Check IntersectionObserver support
    IntersectionObserverUtil.checkSupport();

    // Check Clipboard API support
    if (!navigator.clipboard) {
      console.warn('Clipboard API not supported - using fallback');
    }

    // Check CSS features
    if (!CSS.supports('backdrop-filter', 'blur(10px)')) {
      console.warn('backdrop-filter not supported - glassmorphism effects may not work');
    }
  }

  /**
   * Initialize navigation module
   */
  private initializeNavigation(): void {
    try {
      this.navigation = new Navigation();
      
      // Handle initial hash if present
      if (window.location.hash) {
        this.navigation.handleInitialHash();
      }

      console.log('✓ Navigation initialized');
    } catch (error) {
      console.error('Failed to initialize navigation:', error);
    }
  }

  /**
   * Initialize scroll animations
   */
  private initializeAnimations(): void {
    try {
      this.scrollAnimations = new ScrollAnimations();

      // Observe fade-in elements
      const fadeElements = document.querySelectorAll('.fade-in');
      if (fadeElements.length > 0) {
        this.scrollAnimations.observe(fadeElements);
        console.log(`✓ Observing ${fadeElements.length} fade-in elements`);
      }

      // Observe stagger elements
      const staggerElements = document.querySelectorAll('.stagger-item');
      if (staggerElements.length > 0) {
        this.scrollAnimations.observe(staggerElements);
        console.log(`✓ Observing ${staggerElements.length} stagger elements`);
      }

      console.log('✓ Scroll animations initialized');
    } catch (error) {
      console.error('Failed to initialize animations:', error);
    }
  }

  /**
   * Initialize image lazy loading
   */
  private initializeImages(): void {
    try {
      this.imageLazyLoader = new ImageLazyLoader();
      
      const stats = this.imageLazyLoader.getStats();
      console.log(`✓ Image lazy loader initialized (${stats.total} images)`);
    } catch (error) {
      console.error('Failed to initialize image lazy loading:', error);
    }
  }

  /**
   * Initialize all components
   */
  private initializeComponents(): void {
    try {
      // Initialize Header Component
      const header = new HeaderComponent();
      header.init();
      this.components.set('header', header);

      // Initialize Works Component
      const works = new WorksComponent();
      works.init();
      this.components.set('works', works);

      // Initialize Contacts Component
      const contacts = new ContactsComponent();
      contacts.init();
      this.components.set('contacts', contacts);

      console.log(`✓ ${this.components.size} components initialized`);
    } catch (error) {
      console.error('Failed to initialize components:', error);
    }
  }

  /**
   * Log environment information
   */
  private logEnvironmentInfo(): void {
    const info = {
      mode: import.meta.env.MODE,
      baseUrl: import.meta.env.BASE_URL,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      userAgent: navigator.userAgent,
      pixelRatio: window.devicePixelRatio,
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    };

    console.log('🔍 Environment Info:', info);
  }

  /**
   * Clean up and destroy application
   */
  public destroy(): void {
    console.log('🧹 Cleaning up application...');

    // Destroy navigation
    if (this.navigation) {
      this.navigation.destroy();
    }

    // Destroy scroll animations
    if (this.scrollAnimations) {
      this.scrollAnimations.destroy();
    }

    // Destroy image lazy loader
    if (this.imageLazyLoader) {
      this.imageLazyLoader.destroy();
    }

    // Destroy all components
    this.components.forEach((component, name) => {
      if (component.destroy) {
        component.destroy();
      }
      console.log(`✓ ${name} destroyed`);
    });
    this.components.clear();

    console.log('✓ Application destroyed');
  }

  /**
   * Get a specific component by name
   */
  public getComponent<T extends Component>(name: string): T | undefined {
    return this.components.get(name) as T | undefined;
  }

  /**
   * Refresh lazy loaded images (useful for dynamic content)
   */
  public refreshImages(): void {
    if (this.imageLazyLoader) {
      this.imageLazyLoader.refresh();
    }
  }
}

// Initialize application
const app = new App();

// Expose app to window for debugging in development
if (import.meta.env.DEV) {
  (window as any).app = app;
  console.log('💡 App instance available as window.app (development mode)');
}

// Export for potential external access
export default app;

// Hot Module Replacement (HMR) support
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('🔥 HMR Update - Reloading...');
  });

  import.meta.hot.dispose(() => {
    console.log('🔥 HMR Dispose - Cleaning up...');
    app.destroy();
  });
}

// Handle visibility change (pause animations when tab is hidden)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('👁️ Page hidden - pausing animations');
  } else {
    console.log('👁️ Page visible - resuming animations');
  }
});

// Handle page unload
window.addEventListener('beforeunload', () => {
  console.log('👋 Page unloading - cleaning up...');
});