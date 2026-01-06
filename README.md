# Луиза - Portfolio Website

A modern, single-page portfolio website for graphic and UX designer Luiza, built with Vite and TypeScript.

## 🎨 Project Overview

This is a professional portfolio website showcasing design work, experience, and skills. The site features a modern glassmorphism design aesthetic with smooth animations and responsive layouts.

### Design Specifications
- **Base Width**: 1440px (Desktop-first design)
- **Sections**: 8 main sections (Header, Hero, About Me, My Works, Work Experience, Education & Tools, Contacts, Footer)
- **Design Style**: Modern with glassmorphism effects (backdrop-blur: 20px)
- **Color Palette**:
  - White: #FFFFFF
  - Dusty Pink: #996F71
  - Light Pink: #DDCACF
  - Black: #080808

### Typography
- **Display Font**: Vetrino Regular
- **Body Font**: SF Pro Text
- **Metadata Font**: Inter

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

```bash
# Clone repository (if applicable)
git clone <repository-url>
cd luilu-cv-web

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

The dev server will run at `http://localhost:3000` with:
- Hot Module Replacement (HMR)
- TypeScript type checking
- Auto-reload on file changes

### Build for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (TypeScript + Vite)
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Lint code with ESLint
- `npm run format` - Format code with Prettier

## ✨ Features

### 🎨 Modern Design
- Glassmorphism effects with 20px backdrop-blur
- Smooth animations and transitions
- Professional color palette
- Clean, minimalist interface

### 📱 Fully Responsive
- Desktop-first design (1440px base)
- Mobile adaptation (320px+)
- Tablet optimization (768px+)
- Fluid typography and spacing

### ⚡ Performance Optimized
- Lazy loading for images
- Code splitting
- Minified assets (CSS & JS)
- Gzip compression
- Optimized bundle size (~25KB JS, ~73KB CSS)

### 🎭 Smooth Animations
- Scroll-based fade-in animations
- Stagger effects for lists
- IntersectionObserver for performance
- RequestAnimationFrame for smooth rendering

### 🧭 Smart Navigation
- Active section tracking
- Smooth scroll behavior
- Show/hide header on scroll
- Mobile hamburger menu

### 🎯 Interactive Features
- **Category Filtering**: Filter portfolio works by type
- **Copy-to-Clipboard**: Quick contact info copying
- **Form Validation**: Contact form with validation
- **Hover Effects**: Interactive card animations

### ♿ Accessible
- WCAG 2.1 AA compliant
- Keyboard navigation support
- ARIA attributes
- Focus indicators
- Semantic HTML structure

## 📁 Project Structure

```
luilu-cv-web/
├── public/                    # Static assets
│   ├── fonts/                # Custom fonts (Vetrino, SF Pro Text, Inter)
│   └── images/               # Images organized by category
│       ├── profile/          # Profile images
│       ├── works/            # Work project images
│       ├── mockups/          # Design mockups
│       └── tools/            # Tool icons
├── src/
│   ├── components/           # Component modules (8 components)
│   │   ├── Header.ts         # Navigation & header logic
│   │   ├── Hero.ts           # Hero section
│   │   ├── About.ts          # About section
│   │   ├── Works.ts          # Portfolio with filtering
│   │   ├── Experience.ts     # Work experience
│   │   ├── Education.ts      # Education & tools
│   │   ├── Contacts.ts       # Contact form & info
│   │   └── Footer.ts         # Footer
│   ├── scripts/              # Core scripts
│   │   ├── navigation.ts     # Navigation logic
│   │   ├── scroll-animations.ts  # Scroll animations
│   │   ├── image-lazy-load.ts    # Image lazy loading
│   │   └── intersection-observer.ts  # Observer utilities
│   ├── styles/               # CSS organized by type
│   │   ├── base/             # Reset, variables, typography
│   │   ├── layout/           # Container, grid utilities
│   │   ├── components/       # Reusable components
│   │   ├── sections/         # Section-specific styles
│   │   └── main.css          # Main entry point
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Application types
│   ├── utils/                # Utility functions
│   │   ├── constants.ts      # Application constants
│   │   ├── dom.ts            # DOM utilities
│   │   └── animations.ts     # Animation utilities
│   ├── main.ts               # Application entry point
│   └── vite-env.d.ts         # Vite environment types
├── index.html                # Main HTML file
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies & scripts
```

## 🛠️ Technologies

### Core
- **Build Tool**: Vite 5.x
- **Language**: TypeScript 5.x
- **Styling**: Modern CSS with custom properties

### Features
- **Effects**: Glassmorphism (backdrop-filter)
- **Animations**: CSS transitions + IntersectionObserver
- **Image Loading**: Lazy loading with IntersectionObserver

### Code Quality
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier
- **Type Safety**: Strict TypeScript configuration

### Optimization
- **Compression**: Gzip compression plugin
- **Images**: Image optimization plugin
- **Minification**: esbuild minification

## 🎯 Implementation Status

### ✅ Phase 1-5: COMPLETE

All phases have been successfully implemented:

- [x] **Phase 1**: Project setup and configuration
- [x] **Phase 2**: HTML structure and CSS foundation
- [x] **Phase 3**: Complete styling system
- [x] **Phase 4**: TypeScript utilities and types
- [x] **Phase 5**: Full interactivity implementation
- [x] **Phase 6**: Testing and validation

### Features Implemented

**Navigation:**
- [x] Smooth scroll navigation
- [x] Active section tracking
- [x] Auto-hide/show header on scroll
- [x] Mobile hamburger menu

**Animations:**
- [x] Fade-in animations on scroll
- [x] Stagger effects for lists
- [x] IntersectionObserver integration
- [x] Performance-optimized animations

**Interactive Components:**
- [x] Category filtering (Works section)
- [x] Copy-to-clipboard (Contacts)
- [x] Form validation
- [x] Image lazy loading
- [x] Hover effects

**Responsive Design:**
- [x] Desktop layout (1440px)
- [x] Tablet adaptation (768px)
- [x] Mobile optimization (320px+)
- [x] Fluid typography

## 🎨 Design System

### Colors
CSS variables defined in [`src/styles/base/variables.css`](src/styles/base/variables.css):
```css
--color-white: #FFFFFF
--color-dusty-pink: #996F71
--color-light-pink: #DDCACF
--color-black: #080808
```

### Typography
- **Display**: Vetrino Regular (headings)
- **Body**: SF Pro Text (Regular, Medium, Semibold, Bold)
- **Metadata**: Inter (Regular, Medium, Semibold)

### Spacing Scale
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px
- 2xl: 40px, 3xl: 48px, 4xl: 64px, 5xl: 80px, 6xl: 96px

### Effects
- **Glassmorphism**: 20px backdrop blur with transparency
- **Shadows**: 5 levels (sm, md, lg, xl, 2xl)
- **Border Radius**: 4px to 24px scale
- **Transitions**: Smooth 0.3s ease-in-out

## 📝 Development Guide

### Adding Fonts
1. Place font files in `public/fonts/`
2. Font declarations are set up in [`src/styles/base/typography.css`](src/styles/base/typography.css)
3. Update font URLs as needed

### Adding Images
1. Organize images in `public/images/` subdirectories
2. Reference using relative paths
3. Images are automatically lazy-loaded

### Component Development
1. Components located in [`src/components/`](src/components/)
2. Each implements the `Component` interface from [`src/types/index.ts`](src/types/index.ts)
3. Initialize in [`src/main.ts`](src/main.ts)

### CSS Architecture
- **Base**: Reset, variables, typography
- **Layout**: Container, grid, flexbox utilities
- **Components**: Reusable UI components
- **Sections**: Page-specific styles
- **Import order**: Maintained in [`main.css`](src/styles/main.css)

## 🔧 Configuration

### Vite Configuration
See [`vite.config.ts`](vite.config.ts) for:
- Port: 3000 (dev server)
- Minification: esbuild
- Compression: gzip
- Image optimization: enabled

### TypeScript
Strict mode enabled with:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noImplicitReturns: true`

## 🔍 Browser Support

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Required Features
- ES2020+ JavaScript
- CSS Custom Properties
- CSS Grid and Flexbox
- backdrop-filter (glassmorphism)
- IntersectionObserver API

## 📊 Build Output

Production build generates:
- **HTML**: ~24KB (minified)
- **CSS**: ~73KB (~12KB gzipped)
- **JavaScript**: ~25KB (~8KB gzipped)
- **Total**: ~122KB (~24KB gzipped)

## 🚀 Deployment

### Quick Deploy Options

**Netlify:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

**Vercel:**
```bash
npm run build
vercel --prod
```

**Manual:**
1. Run `npm run build`
2. Upload `dist/` folder contents to web host
3. Configure server for SPA routing

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## ⚠️ Known Limitations

1. **Fonts**: Placeholder font files need real font files
2. **Images**: Example images should be replaced with actual content
3. **Content**: Placeholder text needs real portfolio content
4. **Contact Form**: Backend integration required for form submission

## 🎯 Next Steps

### Content Integration
1. Add real portfolio images
2. Install actual font files
3. Update text content
4. Add real project details

### Backend Integration
1. Connect contact form to backend/API
2. Add form submission handling
3. Set up email notifications
4. Add success/error messaging

### Enhancements
1. Add analytics (Google Analytics, etc.)
2. Add SEO meta tags
3. Implement social media sharing
4. Add blog section (optional)
5. Set up CMS integration (optional)

## 📄 License

Copyright © 2024 Луиза. All rights reserved.

## 👤 Author

**Луиза (Luiza)**  
Graphic & UX Designer

---

**Status**: ✅ Fully implemented and ready for content integration and deployment.