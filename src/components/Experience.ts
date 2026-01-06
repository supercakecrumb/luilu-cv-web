/**
 * Experience Component
 * Handles experience section functionality
 */

import type { Component } from '../types';

export class Experience implements Component {
  private element: HTMLElement | null = null;

  constructor() {
    this.element = document.querySelector('#experience');
  }

  public init(): void {
    if (!this.element) {
      console.warn('Experience element not found');
      return;
    }
    // TODO: Implement experience timeline in next phase
    console.log('Experience component initialized');
  }

  public destroy(): void {
    console.log('Experience component destroyed');
  }
}