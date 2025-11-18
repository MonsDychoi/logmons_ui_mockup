# CLAUDE.md

<!--
한국어 요약:
- 프로젝트: Supabase 스타일 상업용 대시보드 템플릿
- 기술: Next.js 15 + Shadcn UI (Radix UI + Tailwind v4) + TypeScript
- 전략: Next Shadcn Dashboard (기본) + Supabase 디자인 토큰 + TailAdmin 컴포넌트
- 상태: 초기 기획 단계 (IMPLEMENTATION_PLAN.md 참고)
- 핵심: Supabase 브랜드 컬러(#3ecf8e) 사용, 다크모드 기본, 인증 시스템 없음
-->

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Supabase-inspired commercial dashboard template built with Next.js 15, Shadcn UI, and TypeScript.

**Strategy**: Next Shadcn Dashboard (base) + Supabase design tokens + TailAdmin components (charts/tables)

**Status**: Initial planning phase. Follow `IMPLEMENTATION_PLAN.md` for 10-day build schedule.

## Architecture

### Design System Layers

1. **Foundation**: Radix UI primitives (via Shadcn)
2. **Styling**: Supabase design tokens (colors, spacing, animations)
3. **Components**: Shadcn UI + ApexCharts

### Critical Design Tokens

```typescript
// Supabase brand colors (NOT Shadcn defaults)
--color-brand: #3ecf8e          // Primary green
--typography-body: foreground-light
--panel-body: background-surface-100
--table-body: background-default
```

### Component Structure

```
components/
├── layout/     # Sidebar, header, main-layout
├── charts/     # ApexCharts with Supabase styling
├── tables/     # Shadcn Table + custom styling
├── cards/      # Dashboard stat cards
└── ui/         # Auto-generated Shadcn (DO NOT edit manually)
```

## Development Commands

```bash
pnpm install              # Install dependencies
npm run dev               # Dev server → localhost:3000 (Turbopack)
pnpm build                # Production build
pnpm type-check           # TypeScript validation
pnpm lint                 # ESLint check

# Add Shadcn component
npx shadcn-ui@latest add [component-name]
```

### Dev Server Rules

**ALWAYS run on port 3000**. If port is occupied:

```bash
# Windows: Kill process on port 3000
netstat -ano | findstr :3000
taskkill /F /PID [PID]

# Then run
npm run dev
```

## Key Implementation Rules

### Styling

- **Default theme**: Dark mode (Supabase style)
- **Color classes**: Use semantic tokens (`text-typography-body`, `bg-panel-body`)
- **Borders**: `border-panel-border` (containers), `border-panel-border-interior` (nested)
- **Hover**: `hover:bg-panel-border-hover`

### Charts (ApexCharts)

Must use Supabase colors:
```typescript
colors: ["#3ecf8e", "#6fdc9f"]
grid: { borderColor: "#404040" }
```

### Authentication

No auth included by design. Use `lib/mock-data.ts` for demo data.

### Shadcn Components

- Add via CLI only (auto-applies Supabase tokens)
- Wrap in domain components (charts/, tables/) for customization
- Never manually edit `components/ui/*`

## Configuration Files

- `tailwind.config.ts`: Supabase tokens + Shadcn compatibility (critical - preserve both)
- `app/globals.css`: CSS variables for Supabase design system
- `components/layout/main-layout.tsx`: Dashboard shell wrapper

## Documentation

- `IMPLEMENTATION_PLAN.md`: 10-day build guide with code examples
- `dashboard-template-comparison.md`: Template selection rationale
