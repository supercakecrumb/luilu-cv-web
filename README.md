# Луиза - Portfolio Website

A modern, single-page portfolio website for graphic and UX designer Luiza, built with Vite and TypeScript.

## 🎨 Project Overview

This is a professional portfolio website showcasing design work, experience, and skills. The site features a modern glassmorphism design aesthetic with smooth animations and responsive layouts.

### Design Specifications
- **Base Width**: 1440px
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

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository** (if applicable):
```bash
git clone <repository-url>
cd luilu-cv-web
```

2. **Install dependencies**:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Other Scripts

- **Type Check**: `npm run type-check` - Run TypeScript compiler without emitting files
- **Lint**: `npm run lint` - Check code quality with ESLint
- **Format**: `npm run format` - Format code with Prettier

## 📁 Project Structure

```
luilu-cv-web/
├── public/                    # Static assets
│   ├── fonts/                # Font files (to be added)
│   └── images/               # Image assets
│       ├── profile/          # Profile images
│       ├── works/            # Work project images
│       ├── mockups/          # Design mockups
│       └── tools/            # Tool icons
├── src/
│   ├── components/           # Component modules
│   │   ├── Header.ts         # Header component
│   │   ├── Hero.ts           # Hero section component
│   │   ├── About.ts          # About section component
│   │   ├── Works.ts          # Works section component
│   │   ├── Experience.ts     # Experience section component
│   │   ├── Education.ts      # Education section component
│   │   ├── Contacts.ts       # Contacts section component
│   │   └── Footer.ts         # Footer component
│   ├── scripts/              # Utility scripts
│   │   ├── navigation.ts     # Navigation functionality
│   │   ├── scroll-animations.ts  # Scroll-based animations
│   │   ├── image-lazy-load.ts    # Image lazy loading
│   │   └── intersection-observer.ts  # Visibility detection
│   ├── styles/               # CSS modules
│   │   ├── base/             # Base styles
│   │   │   ├── reset.css     # CSS reset
│   │   │   ├── variables.css # Design tokens
│   │   │   └── typography.css # Typography system
│   │   ├── layout/           # Layout utilities
│   │   │   ├── container.css # Container utilities
│   │   │   └── grid.css      # Grid and flexbox utilities
│   │   ├── components/       # Component styles
│   │   │   ├── button.css    # Button component
│   │   │   ├── badge.css     # Badge component
│   │   │   ├── card.css      # Card component
│   │   │   ├── glassmorphism.css # Glass effects
│   │   │   └── navigation.css # Navigation component
│   │   ├── sections/         # Section-specific styles
│   │   │   ├── header.css    # Header styles
│   │   │   ├── hero.css      # Hero section styles
│   │   │   ├── about.css     # About section styles
│   │   │   ├── works.css     # Works section styles
│   │   │   ├── experience.css # Experience section styles
│   │   │   ├── education.css  # Education section styles
│   │   │   ├── contacts.css   # Contacts section styles
│   │   │   └── footer.css     # Footer styles
│   │   └── main.css          # Main CSS entry point
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Type definitions
│   ├── utils/                # Utility functions
│   │   └── constants.ts      # Application constants
│   ├── main.ts               # Application entry point
│   └── vite-env.d.ts         # Vite environment types
├── index.html                # Main HTML file
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── tsconfig.node.json        # TypeScript config for Node
├── vite.config.ts            # Vite configuration
├── .eslintrc.json            # ESLint configuration
├── .prettierrc               # Prettier configuration
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## 🎯 Current Implementation Status

### ✅ Phase 1 & 2: Foundation - COMPLETE

- [x] Vite + TypeScript project setup
- [x] Complete folder structure
- [x] Configuration files (package.json, tsconfig, vite.config, etc.)
- [x] HTML structure with all 8 sections
- [x] CSS foundation (reset, variables, typography)
- [x] Layout utilities (container, grid, flexbox)
- [x] Glassmorphism component styles
- [x] Component placeholders (8 components)
- [x] Script placeholders
- [x] TypeScript types and constants
- [x] Main application entry point

### 🔄 Next Phase: Component Implementation

The foundation is ready for implementing:
- Component functionality (navigation, animations, etc.)
- Actual content integration
- Image and font asset integration
- Interactive features (filtering, forms, etc.)
- Advanced animations and transitions

## 🛠️ Technology Stack

- **Build Tool**: Vite 5.x
- **Language**: TypeScript 5.x
- **Styling**: CSS3 (with CSS Custom Properties)
- **Code Quality**: ESLint + Prettier
- **Optimization**: Compression, Image minification

## 🎨 Design System

### Colors
CSS variables are defined in `src/styles/base/variables.css`:
- `--color-white`, `--color-dusty-pink`, `--color-light-pink`, `--color-black`

### Typography
- Display headings: Vetrino Regular
- Body text: SF Pro Text
- Metadata: Inter

### Spacing Scale
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 40px, 3xl: 48px, 4xl: 64px, etc.

### Effects
- Glassmorphism: 20px backdrop blur with transparency
- Shadows: Multiple levels (sm, md, lg, xl, 2xl)
- Border radius: From 4px to 24px

## 📝 Development Notes

### Adding Fonts
1. Place font files in `public/fonts/`
2. Font declarations are already set up in `src/styles/base/typography.css`
3. Update font URLs when files are available

### Adding Images
1. Place images in appropriate subdirectories under `public/images/`
2. Reference them in HTML or CSS as needed

### Component Development
1. Components are located in `src/components/`
2. Each component implements the `Component` interface
3. Initialize components in `src/main.ts`

### CSS Architecture
- Base styles: Reset, variables, typography
- Layout utilities: Container, grid, flexbox
- Components: Reusable UI components
- Sections: Page-specific styles

## 🔍 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS Custom Properties
- CSS Grid and Flexbox
- Backdrop-filter (with fallbacks for glassmorphism)

## 📄 License

Copyright © 2024 Луиза. All rights reserved.

## 👤 Author

**Луиза (Luiza)**  
Graphic & UX Designer

---

**Note**: This is Phase 1 & 2 (Foundation Setup) of the project. The structure is complete and ready for content integration and feature implementation in subsequent phases.