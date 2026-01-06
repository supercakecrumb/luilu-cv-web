/**
 * Image Lazy Loading Module
 * Handles lazy loading of images as they enter the viewport
 */

import { DOM } from '../utils/dom';
import { IntersectionObserverUtil } from './intersection-observer';

/**
 * Image Lazy Loader Class
 */
export class ImageLazyLoader {
  private images: NodeListOf<HTMLImageElement>;
  private observer: IntersectionObserver | null = null;
  private loadedImages: Set<HTMLImageElement> = new Set();

  constructor() {
    // Find all images with data-src attribute
    this.images = DOM.selectAll<HTMLImageElement>('img[data-src]');
    this.init();
  }

  /**
   * Initialize lazy loading
   */
  private init(): void {
    if (!IntersectionObserverUtil.isSupported()) {
      console.warn('IntersectionObserver not supported - loading all images immediately');
      this.loadAllImages();
      return;
    }

    this.setupObserver();
    console.log(`Image lazy loader initialized with ${this.images.length} images`);
  }

  /**
   * Setup Intersection Observer for images
   */
  private setupObserver(): void {
    this.observer = IntersectionObserverUtil.createLazyLoadObserver(
      (element) => {
        this.loadImage(element as HTMLImageElement);
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        once: true,
      }
    );

    // Observe all images
    this.images.forEach((img) => {
      if (this.observer) {
        this.observer.observe(img);
      }
    });
  }

  /**
   * Load a single image
   */
  private loadImage(img: HTMLImageElement): void {
    // Skip if already loaded
    if (this.loadedImages.has(img)) {
      return;
    }

    const src = img.dataset.src;
    const srcset = img.dataset.srcset;

    if (!src) {
      console.warn('Image missing data-src attribute', img);
      return;
    }

    // Add loading class
    DOM.addClass(img, 'loading');

    // Create a new image to preload
    const tempImg = new Image();

    // Handle successful load
    tempImg.onload = () => {
      this.onImageLoad(img, src, srcset);
    };

    // Handle load error
    tempImg.onerror = () => {
      this.onImageError(img, src);
    };

    // Start loading
    if (srcset) {
      tempImg.srcset = srcset;
    }
    tempImg.src = src;
  }

  /**
   * Handle successful image load
   */
  private onImageLoad(img: HTMLImageElement, src: string, srcset?: string): void {
    // Set the actual src
    img.src = src;
    
    // Set srcset if available
    if (srcset) {
      img.srcset = srcset;
    }

    // Remove data attributes
    img.removeAttribute('data-src');
    if (srcset) {
      img.removeAttribute('data-srcset');
    }

    // Update classes
    DOM.removeClass(img, 'loading');
    DOM.addClass(img, 'loaded');

    // Add to loaded set
    this.loadedImages.add(img);

    // Unobserve the image
    if (this.observer) {
      this.observer.unobserve(img);
    }

    // Dispatch custom event
    img.dispatchEvent(new CustomEvent('imageLoaded', { detail: { src } }));
  }

  /**
   * Handle image load error
   */
  private onImageError(img: HTMLImageElement, src: string): void {
    console.error('Failed to load image:', src);

    // Remove loading class
    DOM.removeClass(img, 'loading');
    DOM.addClass(img, 'error');

    // Set alt text if not present
    if (!img.alt) {
      img.alt = 'Image failed to load';
    }

    // Optionally set a fallback image
    const fallbackSrc = img.dataset.fallback;
    if (fallbackSrc) {
      img.src = fallbackSrc;
    }

    // Dispatch custom event
    img.dispatchEvent(new CustomEvent('imageError', { detail: { src } }));
  }

  /**
   * Load all images immediately (fallback for unsupported browsers)
   */
  private loadAllImages(): void {
    this.images.forEach((img) => {
      this.loadImage(img);
    });
  }

  /**
   * Manually trigger loading for specific images
   */
  public loadImagesInContainer(container: Element): void {
    const images = container.querySelectorAll<HTMLImageElement>('img[data-src]');
    images.forEach((img) => {
      this.loadImage(img);
    });
  }

  /**
   * Refresh - observe new images that may have been added dynamically
   */
  public refresh(): void {
    const newImages = DOM.selectAll<HTMLImageElement>('img[data-src]');
    
    newImages.forEach((img) => {
      // Only observe if not already loaded
      if (!this.loadedImages.has(img) && this.observer) {
        this.observer.observe(img);
      }
    });

    console.log('Image lazy loader refreshed');
  }

  /**
   * Get loading statistics
   */
  public getStats(): { total: number; loaded: number; pending: number } {
    return {
      total: this.images.length,
      loaded: this.loadedImages.size,
      pending: this.images.length - this.loadedImages.size,
    };
  }

  /**
   * Destroy lazy loader and clean up
   */
  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.loadedImages.clear();
    console.log('Image lazy loader destroyed');
  }
}

/**
 * Helper function to setup lazy loading attributes in HTML
 * This can be called to convert existing images to lazy-loadable ones
 */
export function convertImagesToLazy(container: Element = document.body): void {
  const images = container.querySelectorAll<HTMLImageElement>('img:not([data-src])');
  
  images.forEach((img) => {
    const src = img.src;
    const srcset = img.srcset;
    
    if (src && !src.includes('data:')) {
      // Set data-src
      img.dataset.src = src;
      
      // Set data-srcset if available
      if (srcset) {
        img.dataset.srcset = srcset;
        img.removeAttribute('srcset');
      }
      
      // Set a placeholder (1px transparent gif)
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      
      // Add lazy class
      DOM.addClass(img, 'lazy-image');
    }
  });

  console.log(`Converted ${images.length} images to lazy loading`);
}