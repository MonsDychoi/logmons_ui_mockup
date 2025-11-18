# Technology Stack & Languages

LogMons UI Mockup 프로젝트에서 사용하는 모든 언어, 프레임워크, 라이브러리 및 기술 목록입니다.

---

## 📝 Languages (언어)

### Primary Languages
| Language | Version | Usage | Description |
|----------|---------|-------|-------------|
| **TypeScript** | 5.7.2 | Main Development | 타입 안전성을 제공하는 JavaScript 슈퍼셋 |
| **JavaScript** | ES6+ | Configuration | 설정 파일 및 레거시 지원 |
| **TSX** | - | React Components | TypeScript + JSX (React 컴포넌트 문법) |
| **JSX** | - | React Components | JavaScript XML (React 컴포넌트 문법) |
| **CSS** | 3 | Styling | Tailwind 유틸리티 기반 스타일링 |
| **HTML** | 5 | Markup | 시맨틱 마크업 |
| **JSON** | - | Data & Config | 설정 및 데이터 포맷 |

---

## 🚀 Core Framework (핵심 프레임워크)

### Next.js 15.3.2
**Full-stack React Framework**

#### Key Features
- ✅ **File-based Routing** - 파일 시스템 기반 라우팅
- ✅ **App Router** - 새로운 App 디렉토리 구조
- ✅ **Server Components** - 서버 사이드 렌더링 컴포넌트
- ✅ **Client Components** - 클라이언트 사이드 인터랙티브 컴포넌트
- ✅ **Parallel Routes** - 동시 렌더링 슬롯 (예: dashboard overview)
- ✅ **Dynamic Routes** - 동적 경로 (예: product/[productId])
- ✅ **API Routes** - 백엔드 API 엔드포인트
- ✅ **Image Optimization** - 자동 이미지 최적화
- ✅ **Font Optimization** - 폰트 최적화
- ✅ **Turbopack** - 초고속 번들러 (개발 모드)

### React 19.0.0
**UI Library**

#### Key Features
- ✅ **React Hooks** - useState, useEffect, useContext, 커스텀 훅
- ✅ **Server Components** - 서버 컴포넌트 지원
- ✅ **Suspense** - 로딩 상태 관리
- ✅ **Error Boundaries** - 에러 처리
- ✅ **Concurrent Rendering** - 동시성 렌더링

### Node.js
**JavaScript Runtime**
- Next.js 실행 환경
- 서버 사이드 로직 처리

---

## 🎨 UI & Styling (UI 및 스타일링)

### Component Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| **Shadcn UI** | Latest | 메인 컴포넌트 라이브러리 (Radix UI 기반) |
| **Radix UI** | Various | 접근성 높은 Headless UI 컴포넌트 |

#### Shadcn UI Components (40+)
- Accordion, Alert Dialog, Aspect Ratio, Avatar
- Checkbox, Collapsible, Context Menu, Dialog
- Dropdown Menu, Hover Card, Label, Menubar
- Navigation Menu, Popover, Progress, Radio Group
- Scroll Area, Select, Separator, Slider
- Switch, Tabs, Toast, Toggle, Tooltip
- 등 40개 이상의 컴포넌트

#### Radix UI Primitives
```
@radix-ui/react-accordion         1.2.3
@radix-ui/react-alert-dialog      1.1.6
@radix-ui/react-avatar            1.1.3
@radix-ui/react-checkbox          1.1.4
@radix-ui/react-dialog            1.1.6
@radix-ui/react-dropdown-menu     2.1.6
@radix-ui/react-select            2.1.6
@radix-ui/react-tabs              1.1.3
@radix-ui/react-tooltip           1.1.8
... (총 20+ 패키지)
```

### Styling Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 4.0.0 | 유틸리티 우선 CSS 프레임워크 |
| **PostCSS** | 8.4.49 | CSS 프로세싱 |
| **tailwindcss-animate** | 1.0.7 | 애니메이션 유틸리티 |

#### Tailwind Features
- ✅ **Custom Design Tokens** - Supabase 디자인 토큰
- ✅ **Responsive Utilities** - 반응형 유틸리티
- ✅ **Dark Mode** - 다크 모드 지원
- ✅ **CSS Variables** - CSS 커스텀 속성
- ✅ **JIT Compiler** - Just-In-Time 컴파일

### Styling Utilities

| Library | Version | Purpose |
|---------|---------|---------|
| **class-variance-authority** | 0.7.1 | 컴포넌트 variant 스타일링 |
| **clsx** | 2.1.1 | 조건부 className 유틸리티 |
| **tailwind-merge** | 3.0.2 | Tailwind 클래스 병합 |

### Icons

| Library | Version | Count | Purpose |
|---------|---------|-------|---------|
| **Lucide React** | 0.476.0 | 1000+ | 메인 아이콘 라이브러리 (SVG) |
| **Tabler Icons** | 3.31.0 | 4000+ | 추가 아이콘 세트 |
| **Radix Icons** | 1.3.2 | 300+ | Radix UI 전용 아이콘 |

### Theme Management

| Library | Version | Purpose |
|---------|---------|---------|
| **next-themes** | 0.4.6 | 다크/라이트 테마 관리 |

---

## 📊 Charts & Data Visualization (차트 및 시각화)

### Chart Libraries

| Library | Version | Type | Purpose |
|---------|---------|------|---------|
| **ApexCharts** | 5.3.5 | Interactive | 메인 차트 라이브러리 |
| **react-apexcharts** | 1.8.0 | Wrapper | React용 ApexCharts |
| **Recharts** | 2.15.1 | Declarative | 선언형 차트 라이브러리 |

#### ApexCharts Features
- ✅ **Line Charts** - 라인 차트
- ✅ **Bar Charts** - 바 차트
- ✅ **Area Charts** - 영역 차트
- ✅ **Pie Charts** - 파이 차트
- ✅ **Real-time Updates** - 실시간 업데이트
- ✅ **Responsive Design** - 반응형 디자인
- ✅ **Animations** - 애니메이션
- ✅ **Tooltips** - 툴팁

---

## 📝 Forms & Validation (폼 및 유효성 검사)

### Form Management

| Library | Version | Purpose |
|---------|---------|---------|
| **react-hook-form** | 7.54.1 | 폼 상태 관리 |
| **@hookform/resolvers** | 5.2.1 | 폼 검증 리졸버 |
| **zod** | 4.1.8 | 스키마 검증 |

#### react-hook-form Features
- ✅ **Performance-focused** - 최소 리렌더링
- ✅ **Built-in Validation** - 내장 검증
- ✅ **TypeScript Support** - 타입 지원
- ✅ **Easy Integration** - 쉬운 통합

#### Zod Features
- ✅ **TypeScript-first** - 타입스크립트 우선
- ✅ **Type Inference** - 타입 추론
- ✅ **Runtime Validation** - 런타임 검증
- ✅ **Schema Composition** - 스키마 조합

---

## 🗃️ State Management & Data Handling (상태 관리 및 데이터 처리)

### State Management

| Library | Version | Purpose |
|---------|---------|---------|
| **Zustand** | 5.0.2 | 경량 전역 상태 관리 |
| **nuqs** | 2.4.1 | URL 쿼리 상태 관리 |

#### Zustand Features
- ✅ **Simple API** - 간단한 API
- ✅ **No Boilerplate** - 보일러플레이트 없음
- ✅ **TypeScript Support** - 타입스크립트 지원
- ✅ **DevTools** - 개발자 도구

### Data Tables

| Library | Version | Purpose |
|---------|---------|---------|
| **@tanstack/react-table** | 8.21.2 | Headless 테이블 컴포넌트 |

#### TanStack Table Features
- ✅ **Sorting** - 정렬
- ✅ **Filtering** - 필터링
- ✅ **Pagination** - 페이지네이션
- ✅ **Column Visibility** - 컬럼 표시/숨김
- ✅ **Row Selection** - 행 선택
- ✅ **Column Resizing** - 컬럼 크기 조정

---

## 🎯 UI Utilities & Interactions (UI 유틸리티 및 인터랙션)

### Drag & Drop

| Library | Version | Purpose |
|---------|---------|---------|
| **@dnd-kit/core** | 6.3.1 | 드래그 앤 드롭 코어 |
| **@dnd-kit/sortable** | 8.0.0 | 정렬 가능 리스트 |
| **@dnd-kit/modifiers** | 7.0.0 | 드래그 수정자 |
| **@dnd-kit/utilities** | 3.2.2 | 유틸리티 |

#### DND-Kit Features
- ✅ **Accessible** - 접근성 높음 (키보드 지원)
- ✅ **Touch Support** - 터치 지원
- ✅ **Performance** - 고성능
- ✅ **Customizable** - 커스터마이징 가능

### Command Palette

| Library | Version | Purpose |
|---------|---------|---------|
| **kbar** | 0.1.0-beta.45 | Cmd+K 커맨드 팔레트 |
| **cmdk** | 1.1.1 | 커맨드 메뉴 컴포넌트 |

### Notifications & Feedback

| Library | Version | Purpose |
|---------|---------|---------|
| **sonner** | 1.7.1 | 토스트 알림 |
| **vaul** | 1.1.2 | Drawer 컴포넌트 |

### Animations

| Library | Version | Purpose |
|---------|---------|---------|
| **motion** | 11.17.0 | 애니메이션 라이브러리 (Framer Motion 후속) |

#### Motion Features
- ✅ **Declarative Animations** - 선언형 애니메이션
- ✅ **Spring Physics** - 스프링 물리 엔진
- ✅ **Gestures** - 제스처 지원
- ✅ **SVG Animations** - SVG 애니메이션

### Layout Utilities

| Library | Version | Purpose |
|---------|---------|---------|
| **react-resizable-panels** | 2.1.7 | 크기 조절 가능한 패널 |
| **react-responsive** | 10.0.0 | 미디어 쿼리 훅 |

---

## 📁 File Handling (파일 처리)

| Library | Version | Purpose |
|---------|---------|---------|
| **react-dropzone** | 14.3.5 | 드래그 앤 드롭 파일 업로드 |
| **sharp** | 0.33.5 | 이미지 프로세싱 (Next.js 최적화) |

#### react-dropzone Features
- ✅ **Drag & Drop** - 드래그 앤 드롭
- ✅ **File Validation** - 파일 검증
- ✅ **Multiple Files** - 다중 파일
- ✅ **Accessibility** - 접근성

---

## 🛠️ Utilities (유틸리티)

### Date & Time

| Library | Version | Purpose |
|---------|---------|---------|
| **date-fns** | 4.1.0 | 날짜/시간 조작 및 포맷팅 |
| **react-day-picker** | 8.10.1 | 날짜 선택기 컴포넌트 |

### Data Utilities

| Library | Version | Purpose |
|---------|---------|---------|
| **uuid** | 11.0.3 | UUID 생성 |
| **match-sorter** | 8.0.0 | 필터링 및 정렬 |
| **sort-by** | 1.2.0 | 객체 정렬 |

### Input Utilities

| Library | Version | Purpose |
|---------|---------|---------|
| **input-otp** | 1.4.2 | OTP 입력 컴포넌트 |

---

## 🔧 Development Tools (개발 도구)

### Code Quality

| Tool | Version | Purpose |
|------|---------|---------|
| **ESLint** | 8.48.0 | 코드 린팅 |
| **eslint-config-next** | 15.1.0 | Next.js ESLint 설정 |
| **@typescript-eslint/eslint-plugin** | 6.11.0 | TypeScript ESLint 플러그인 |
| **Prettier** | 3.4.2 | 코드 포맷팅 |
| **prettier-plugin-tailwindcss** | 0.6.11 | Tailwind Prettier 플러그인 |

### Mock Data

| Library | Version | Purpose |
|---------|---------|---------|
| **@faker-js/faker** | 9.6.0 | 가짜 데이터 생성 (테스트/데모용) |

#### Faker.js Data Types
- ✅ **Person** - 이름, 이메일, 전화번호
- ✅ **Commerce** - 제품, 가격, 카테고리
- ✅ **Company** - 회사명, 업종
- ✅ **Date** - 날짜, 시간
- ✅ **Internet** - URL, 도메인, 아이피
- ✅ **Lorem** - 텍스트, 문장, 단락

### Build Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **Turbopack** | Latest | Next.js 번들러 (개발 모드) |
| **TypeScript Compiler** | 5.7.2 | 타입 체킹 |
| **PostCSS** | 8.4.49 | CSS 프로세싱 |

### Package Manager

| Tool | Version | Purpose |
|------|---------|---------|
| **pnpm** | Latest | 고속 디스크 효율적 패키지 매니저 |

#### pnpm Advantages
- ✅ **Fast** - npm/yarn보다 2배 빠름
- ✅ **Disk Efficient** - 하드 링크 사용
- ✅ **Monorepo Support** - 모노레포 지원
- ✅ **Strict** - 엄격한 의존성 관리

---

## 🌐 Browser APIs & Web Standards (브라우저 API 및 웹 표준)

### Web APIs
- **localStorage** - 로컬 스토리지
- **sessionStorage** - 세션 스토리지
- **fetch** - HTTP 요청
- **IntersectionObserver** - 요소 교차 감지
- **ResizeObserver** - 요소 크기 변경 감지

### Accessibility (접근성)
- **ARIA Attributes** - ARIA 속성
- **Keyboard Navigation** - 키보드 네비게이션
- **Screen Reader Support** - 스크린 리더 지원
- **WCAG 2.1 Compliance** - WCAG 2.1 준수

### Responsive Design
- **CSS Grid** - CSS 그리드
- **Flexbox** - 플렉스박스
- **Media Queries** - 미디어 쿼리
- **Container Queries** - 컨테이너 쿼리

### Modern JavaScript
- **Promises** - 프로미스
- **async/await** - 비동기 함수
- **ES Modules** - ES 모듈
- **Optional Chaining** - 옵셔널 체이닝
- **Nullish Coalescing** - Null 병합 연산자
- **Array Methods** - map, filter, reduce, etc.

---

## 🎨 Design System (디자인 시스템)

### Color Palette (Supabase-inspired)

```css
/* Brand Colors */
--color-brand: #3ecf8e          /* Primary green */
--color-brand-hover: #6fdc9f    /* Hover state */

/* Typography */
--typography-body: foreground-light
--typography-heading: foreground

/* Backgrounds */
--panel-body: background-surface-100
--table-body: background-default
--background: 0 0% 100%         /* Light mode */
--background-dark: 240 10% 4%   /* Dark mode */

/* Borders */
--panel-border: #404040
--panel-border-interior: #2e2e2e
--panel-border-hover: #505050

/* Chart Colors */
--chart-1: #3ecf8e
--chart-2: #6fdc9f
--chart-3: #f97066
--chart-4: #f79009
```

### Typography

```css
/* Font Families */
--font-sans: 'Inter', system-ui, sans-serif
--font-mono: 'JetBrains Mono', monospace

/* Font Sizes */
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-lg: 1.125rem   /* 18px */
--text-xl: 1.25rem    /* 20px */
--text-2xl: 1.5rem    /* 24px */
```

### Spacing

```css
/* Tailwind Spacing Scale */
--spacing-1: 0.25rem   /* 4px */
--spacing-2: 0.5rem    /* 8px */
--spacing-4: 1rem      /* 16px */
--spacing-8: 2rem      /* 32px */
--spacing-16: 4rem     /* 64px */
```

### Border Radius

```css
--radius-sm: 0.125rem   /* 2px */
--radius-md: 0.375rem   /* 6px */
--radius-lg: 0.5rem     /* 8px */
--radius-xl: 0.75rem    /* 12px */
```

---

## 📦 Type Definitions (타입 정의)

### TypeScript Types

```typescript
@types/node                 22.10.2
@types/react                19.0.1
@types/react-dom            19.0.2
@types/sort-by              1.2.3
@types/uuid                 10.0.0
```

---

## 🚀 Runtime Environment (런타임 환경)

### Development
- **Node.js** - 18+ (권장)
- **npm** - 9+ 또는 **pnpm** - 8+
- **OS** - Windows, macOS, Linux

### Browser Support
- **Chrome** - 최신 2개 버전
- **Firefox** - 최신 2개 버전
- **Safari** - 최신 2개 버전
- **Edge** - 최신 2개 버전

### Build Targets
- **ES2020** - JavaScript 타겟
- **ESNext** - TypeScript 타겟

---

## 📊 Performance Metrics (성능 지표)

### Bundle Optimization
- ✅ **Code Splitting** - 코드 분할
- ✅ **Tree Shaking** - 트리 쉐이킹
- ✅ **Lazy Loading** - 지연 로딩
- ✅ **Image Optimization** - 이미지 최적화
- ✅ **Font Optimization** - 폰트 최적화

### Development Experience
- ✅ **Hot Module Replacement (HMR)** - 핫 모듈 교체
- ✅ **Fast Refresh** - 빠른 새로고침
- ✅ **TypeScript** - 타입 안전성
- ✅ **ESLint** - 코드 품질
- ✅ **Prettier** - 코드 포맷팅

---

## 📝 Configuration Files (설정 파일)

| File | Purpose |
|------|---------|
| `package.json` | 의존성 및 스크립트 |
| `tsconfig.json` | TypeScript 설정 |
| `next.config.ts` | Next.js 설정 |
| `tailwind.config.ts` | Tailwind CSS 설정 |
| `postcss.config.js` | PostCSS 설정 |
| `.eslintrc.json` | ESLint 설정 |
| `.prettierrc` | Prettier 설정 |
| `components.json` | Shadcn UI 설정 |

---

## 📚 Documentation & Resources (문서 및 리소스)

### Official Documentation
- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)
- [ApexCharts](https://apexcharts.com/docs)
- [TanStack Table](https://tanstack.com/table)
- [Zustand](https://docs.pmnd.rs/zustand)

---

**Last Updated**: 2025-11-17
**Project Version**: 1.0.0
**Maintained By**: LogMons Development Team
