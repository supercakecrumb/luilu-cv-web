/**
 * Main application entry point for Luiza Portfolio Website
 * Phase 1 & 2: Foundation Setup
 */

// Import main CSS
import './styles/main.css';

// Import types
import type { Component } from './types';

// Import constants
import { CSS_CLASSES } from './utils/constants';

/**
 * Main application class
 */
class App {
  private components: Map<string, Component> = new Map();

  constructor() {
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
    console.log('🎨 Luiza Portfolio Website - Foundation Initialized');
    console.log('📦 Phase 1 & 2: Foundation Setup Complete');
    
    // Remove loading class from body if present
    document.body.classList.remove(CSS_CLASSES.LOADING);
    
    // Add fade-in animation to main content
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.classList.add(CSS_CLASSES.FADE_IN);
    }

    // TODO: Initialize components in next phase
    // this.initializeComponents();
    
    // Log environment info
    this.logEnvironmentInfo();
  }

  /**
   * Initialize all components (placeholder for next phase)
   */
  private initializeComponents(): void {
    // TODO: Import and initialize components
    // import { Header } from './components/Header';
    // import { Hero } from './components/Hero';
    // etc.
    
    console.log('⚠️ Component initialization will be implemented in next phase');
  }

  /**
   * Log environment information
   */
  private logEnvironmentInfo(): void {
    console.log('Environment:', import.meta.env.MODE);
    console.log('Base URL:', import.meta.env.BASE_URL);
    console.log('Viewport:', {
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  /**
   * Clean up and destroy application
   */
  public destroy(): void {
    // Destroy all components
    this.components.forEach((component) => {
      if (component.destroy) {
        component.destroy();
      }
    });
    this.components.clear();
    
    console.log('🧹 Application destroyed');
  }
}

// Initialize application
const app = new App();

// Export for potential external access
export default app;

// Hot Module Replacement (HMR) support
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('🔥 HMR Update');
  });
  
  import.meta.hot.dispose(() => {
    app.destroy();
  });
}