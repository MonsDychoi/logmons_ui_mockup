# Project Structure

## Overview
**Project**: LogMons UI Mockup - Supabase-style Dashboard Template
**Tech Stack**: Next.js 15 + Shadcn UI + TypeScript + Tailwind v4
**Status**: Initial planning phase

---

## Directory Structure

```
logmons_ui_mockup/
│
├── .claude/                    # SuperClaude framework configuration
│   ├── CLAUDE.md              # Project-specific instructions
│   ├── FLAGS.md               # Behavioral flags
│   ├── PRINCIPLES.md          # Software engineering principles
│   ├── RULES.md               # Coding rules and standards
│   └── MODE_*.md              # Behavioral modes (Brainstorming, Task Management, etc.)
│
├── docs/                       # Documentation
│   └── PROJECT_STRUCTURE.md   # This file
│
├── public/                     # Static assets
│   └── assets/                # Images, icons, etc.
│
├── src/                        # Source code
│   ├── app/                   # Next.js 15 App Router
│   │   ├── auth/             # Authentication pages
│   │   │   ├── sign-in/      # Login page
│   │   │   └── sign-up/      # Registration page
│   │   │
│   │   ├── dashboard/        # Dashboard application
│   │   │   ├── analytics/    # Analytics page
│   │   │   ├── api/          # API management page
│   │   │   ├── database/     # Database management page
│   │   │   ├── kanban/       # Kanban board
│   │   │   ├── logs/         # Logs viewer
│   │   │   ├── overview/     # Dashboard overview (parallel routes)
│   │   │   │   ├── @area_stats/   # Area chart stats slot
│   │   │   │   ├── @bar_stats/    # Bar chart stats slot
│   │   │   │   ├── @pie_stats/    # Pie chart stats slot
│   │   │   │   └── @sales/        # Sales chart slot
│   │   │   ├── product/      # Product management
│   │   │   │   └── [productId]/   # Dynamic product detail
│   │   │   ├── security/     # Security settings
│   │   │   ├── settings/     # App settings
│   │   │   ├── users/        # User management
│   │   │   ├── layout.tsx    # Dashboard layout wrapper
│   │   │   └── page.tsx      # Dashboard home
│   │   │
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Landing page
│   │   ├── not-found.tsx     # 404 page
│   │   └── global-error.tsx  # Global error handler
│   │
│   ├── components/            # Reusable components
│   │   ├── auth/             # Auth-related components
│   │   │   └── login-form.tsx
│   │   ├── charts/           # Chart components (ApexCharts)
│   │   │   ├── bar-chart.tsx
│   │   │   └── line-chart.tsx
│   │   ├── forms/            # Form components
│   │   │   ├── demo-form.tsx
│   │   │   ├── form-checkbox.tsx
│   │   │   ├── form-date-picker.tsx
│   │   │   ├── form-file-upload.tsx
│   │   │   ├── form-input.tsx
│   │   │   ├── form-radio-group.tsx
│   │   │   ├── form-select.tsx
│   │   │   ├── form-slider.tsx
│   │   │   ├── form-switch.tsx
│   │   │   └── form-textarea.tsx
│   │   ├── layout/           # Layout components
│   │   │   └── ThemeToggle/  # Theme switcher
│   │   ├── modal/            # Modal components
│   │   ├── kbar/             # Command palette (Cmd+K)
│   │   ├── ui/               # Shadcn UI components (auto-generated)
│   │   │   └── table/        # Table components
│   │   ├── breadcrumbs.tsx
│   │   ├── file-uploader.tsx
│   │   └── form-card-skeleton.tsx
│   │
│   ├── features/             # Feature-based modules
│   │   ├── kanban/          # Kanban board feature
│   │   │   ├── components/
│   │   │   └── utils/
│   │   ├── overview/        # Dashboard overview feature
│   │   │   └── components/
│   │   └── products/        # Product management feature
│   │       └── components/
│   │           └── product-tables/
│   │
│   ├── config/              # Configuration files
│   ├── constants/           # App constants
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and helpers
│   └── types/               # TypeScript type definitions
│
├── .eslintrc.json           # ESLint configuration
├── .prettierrc              # Prettier configuration
├── .gitignore               # Git ignore rules
├── components.json          # Shadcn UI configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and scripts
├── pnpm-lock.yaml          # Lockfile
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── CLAUDE.md               # Project instructions for Claude Code
├── LICENSE                 # License file
└── PROGRESS.md            # Development progress tracking
```

---

## Technology Stack

### Languages
- **TypeScript 5.7.2** - Primary development language (type-safe JavaScript)
- **JavaScript (ES6+)** - Configuration files and legacy support
- **TSX/JSX** - React component syntax
- **CSS** - Styling (via Tailwind CSS utilities)
- **HTML5** - Semantic markup
- **JSON** - Configuration and data

### Core Framework
- **Next.js 15.3.2** - React framework with App Router
  - File-based routing
  - Server Components & Client Components
  - Parallel Routes (dashboard overview)
  - Dynamic Routes (product/[productId])
  - API Routes
  - Image optimization
  - Font optimization
- **React 19.0.0** - UI library
  - Hooks (useState, useEffect, useContext, custom hooks)
  - Server Components
  - Suspense & Error Boundaries
- **Node.js** - JavaScript runtime (via Next.js)

### UI & Styling
- **Shadcn UI** - Component library (Radix UI primitives)
  - 40+ pre-built accessible components
  - Customizable via Tailwind
- **Tailwind CSS v4** - Utility-first CSS framework
  - Custom design tokens
  - Responsive utilities
  - Dark mode support
- **Radix UI** - Accessible component primitives
  - Dialog, Dropdown, Select, Tooltip, etc.
  - WCAG 2.1 compliant
- **Lucide React 0.476** - Icon library (1000+ SVG icons)
- **Tabler Icons 3.31** - Additional icon set
- **next-themes 0.4.6** - Theme management (dark/light mode)
- **class-variance-authority** - Component variant styling
- **clsx** - Conditional className utility
- **tailwind-merge** - Tailwind class merging

### Charts & Data Visualization
- **ApexCharts 5.3.5** - Interactive chart library
  - Line, Bar, Area, Pie charts
  - Real-time updates
  - Responsive design
- **react-apexcharts 1.8.0** - React wrapper for ApexCharts
- **Recharts 2.15.1** - Declarative chart library

### Forms & Validation
- **react-hook-form 7.54.1** - Form state management
  - Performance-focused (minimal re-renders)
  - Built-in validation
- **zod 4.1.8** - TypeScript-first schema validation
  - Type inference
  - Runtime validation
- **@hookform/resolvers 5.2.1** - Form validation resolvers

### State Management & Data Handling
- **Zustand 5.0.2** - Lightweight state management
  - Simple API
  - No boilerplate
- **@tanstack/react-table 8.21.2** - Headless table component
  - Sorting, filtering, pagination
  - Column visibility
- **nuqs 2.4.1** - URL query state management
  - Type-safe URL params

### UI Utilities & Interactions
- **@dnd-kit** - Drag and drop functionality
  - Core 6.3.1, Sortable 8.0.0, Modifiers 7.0.0
  - Accessible drag-and-drop
  - Touch support
- **kbar 0.1.0-beta.45** - Command palette (Cmd+K)
- **cmdk 1.1.1** - Command menu component
- **vaul 1.1.2** - Drawer component
- **sonner 1.7.1** - Toast notifications
- **motion 11.17.0** - Animation library (Framer Motion successor)
- **react-resizable-panels 2.1.7** - Resizable panel layouts
- **react-responsive 10.0.0** - Media query hooks

### File Handling
- **react-dropzone 14.3.5** - Drag-and-drop file uploads
- **sharp 0.33.5** - Image processing (Next.js optimization)

### Utilities
- **date-fns 4.1.0** - Date manipulation
- **uuid 11.0.3** - UUID generation
- **match-sorter 8.0.0** - Filtering and sorting
- **sort-by 1.2.0** - Object sorting

### Development Tools
- **ESLint 8.48.0** - Code linting
  - Next.js config
  - TypeScript support
- **Prettier 3.4.2** - Code formatting
  - Tailwind plugin
- **@faker-js/faker 9.6.0** - Mock data generation
- **Turbopack** - Next.js bundler (dev mode)

### Build & Deployment
- **pnpm** - Package manager (fast, disk-efficient)
- **PostCSS 8.4.49** - CSS processing
- **TypeScript Compiler** - Type checking

### Browser APIs & Standards
- **Web APIs**: localStorage, sessionStorage, fetch
- **Accessibility**: ARIA attributes, keyboard navigation
- **Responsive Design**: CSS Grid, Flexbox, Media Queries
- **Modern JavaScript**: Promises, async/await, ES Modules

---

## Design System

### Color Scheme (Supabase-inspired)
```css
--color-brand: #3ecf8e          /* Primary green */
--typography-body: foreground-light
--panel-body: background-surface-100
--table-body: background-default
```

### Component Architecture
1. **Foundation Layer**: Radix UI primitives (via Shadcn)
2. **Styling Layer**: Supabase design tokens (colors, spacing, animations)
3. **Component Layer**: Shadcn UI + ApexCharts

---

## Key Features

### Authentication
- Sign-in/Sign-up pages
- No backend auth (demo/mockup)
- Uses mock data for demonstration

### Dashboard Pages
- **Overview**: Parallel routes with area/bar/pie stats
- **Analytics**: Data visualization
- **Kanban**: Drag-and-drop task board
- **Products**: Product management with dynamic routes
- **Users**: User management
- **API**: API management interface
- **Database**: Database interface
- **Logs**: Log viewer
- **Security**: Security settings
- **Settings**: Application settings

### UI Components
- Responsive sidebar navigation
- Theme toggle (dark/light mode)
- Command palette (Cmd+K)
- Interactive charts
- Data tables
- Form components
- Modal dialogs
- Toast notifications

---

## Development Workflow

### Setup
```bash
pnpm install              # Install dependencies
npm run dev               # Start dev server (port 3000)
pnpm build                # Production build
```

### Code Quality
```bash
pnpm lint                 # Run ESLint
pnpm lint:fix             # Fix linting issues
pnpm format               # Format with Prettier
```

### Adding Components
```bash
npx shadcn-ui@latest add [component-name]  # Add Shadcn component
```

---

## Project Guidelines

### File Organization
- **App Router**: Use Next.js 15 App Router conventions
- **Component Structure**: Separate UI, features, and layout
- **Type Safety**: All components use TypeScript
- **Styling**: Tailwind utility classes + CSS variables

### Code Standards
- Follow Shadcn UI patterns
- Use Supabase design tokens
- Dark mode by default
- Responsive design (mobile-first)
- Accessible components (WCAG compliant)

### Best Practices
- Never edit `components/ui/*` manually (Shadcn managed)
- Use semantic color tokens (not hard-coded colors)
- Add charts via ApexCharts with Supabase styling
- Place custom logic in `features/` directory
- Use `lib/mock-data.ts` for demo data

---

## Notes

- **Status**: This is a UI mockup/template project
- **Authentication**: No real auth backend (demonstration only)
- **Data**: Uses mock/fake data via @faker-js/faker
- **Deployment**: Ready for static export or Vercel deployment
- **Customization**: Designed to be customized with real backend integration

---

**Last Updated**: 2025-11-17
