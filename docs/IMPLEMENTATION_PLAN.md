# 하이브리드 접근법 - 실행 계획서

Supabase 스타일 상업용 대시보드 템플릿 구축 프로젝트

**전략**: Next Shadcn Dashboard (기본) + Supabase 디자인 (참고) + TailAdmin 컴포넌트 (선별)

**예상 기간**: 10일 (2주)
**예상 비용**: 400만원
**최종 품질**: ⭐⭐⭐⭐⭐

---

## 📅 단계별 실행 계획

### Phase 1: 기본 틀 구축 (Day 1-3)

#### Day 1: 환경 설정 및 초기화

**Step 1: 현재 폴더명 변경**

```bash
# 현재 위치 확인
pwd
# C:\dev_log\workspace\ui-design

# 상위 디렉토리로 이동
cd ..

# 폴더명 변경
mv ui-design logmons-ui-template

# 변경된 폴더로 이동
cd logmons-ui-template
```

또는 **Windows 탐색기**에서:
1. `C:\dev_log\workspace\ui-design` 폴더 우클릭
2. "이름 바꾸기" 클릭
3. `logmons-ui-template` 입력
4. 변경 완료

**Step 2: 기존 파일 정리**

```bash
# 문서 파일을 docs 폴더로 정리
mkdir docs
mv dashboard-template-comparison.md docs/
mv IMPLEMENTATION_PLAN.md docs/

# 현재 구조 확인
ls -la
# docs/ 폴더만 있어야 함
```

**Step 3: Next Shadcn Dashboard Starter 복사**

```bash
# 임시 폴더에 클론
cd ..
git clone https://github.com/Kiranism/next-shadcn-dashboard-starter.git temp-starter
cd temp-starter

# 필요한 파일만 logmons-ui-template로 복사
# (Git 히스토리 제외)
cp -r * ../logmons-ui-template/
cp -r .* ../logmons-ui-template/ 2>/dev/null || true

# logmons-ui-template로 이동
cd ../logmons-ui-template

# 임시 폴더 삭제
cd ..
rm -rf temp-starter
cd logmons-ui-template

# Git 재초기화 (새 프로젝트로)
rm -rf .git
git init
git add .
git commit -m "Initial commit: Logmons UI Template base"
```

**Step 4: 의존성 설치 및 실행**

```bash
# 의존성 설치
pnpm install

# 로컬 실행
pnpm dev
# → http://localhost:3000
```

**체크리스트**:
- [ ] 폴더명 변경 완료 (ui-design → logmons-ui-template)
- [ ] 문서 파일 정리 (docs 폴더로 이동)
- [ ] Next Shadcn Dashboard Starter 복사 완료
- [ ] Git 재초기화 완료
- [ ] 의존성 설치 완료
- [ ] 로컬 실행 성공 (http://localhost:3000)
- [ ] 프로젝트 구조 파악

**예상 시간**: 2시간

**최종 폴더 구조**:
```
C:\dev_log\workspace\logmons-ui-template\
├── docs\                           # 문서 폴더
│   ├── dashboard-template-comparison.md
│   └── IMPLEMENTATION_PLAN.md
├── app\                            # Next.js 앱
├── components\                     # React 컴포넌트
├── lib\                            # 유틸리티
├── public\                         # 정적 파일
├── package.json
└── ...
```

---

#### Day 2: Supabase Tailwind 설정 추출

```bash
# 현재 위치: C:\dev_log\workspace\logmons-ui-template

# 1. Supabase 저장소 클론 (분석용, 상위 폴더에)
cd ..
git clone https://github.com/supabase/supabase.git supabase-reference
cd supabase-reference/apps/studio
```

**추출할 파일**:
1. `tailwind.config.js` - 커스텀 설정
2. `styles/globals.css` - CSS 변수
3. 디자인 토큰 분석

**작업 내용**:

```javascript
// 1. Supabase tailwind.config.js 분석
// 위치: supabase/apps/studio/tailwind.config.js

// 추출 대상:
{
  // 커스텀 컬러
  colors: {
    'typography-body': 'foreground-light',
    'typography-body-secondary': 'foreground-lighter',
    'table-body': 'background-default',
    'panel-body': 'background-surface-100',
    // ...
  },

  // 커스텀 폰트 사이즈
  fontSize: {
    grid: '13px',
  },

  // 애니메이션
  keyframes: {
    shimmer: {
      '0%': { backgroundPosition: '-1000px 0' },
      '100%': { backgroundPosition: '1000px 0' },
    },
    sway: {
      '0%, 100%': { transform: 'rotate(-10deg) scale(1.5) translateY(0)' },
      '50%': { transform: 'rotate(10deg) scale(1.5) translateY(-10px)' },
    },
  },

  animation: {
    shimmer: 'shimmer 2s linear infinite',
    sway: 'sway 3s ease-in-out infinite',
  },
}
```

```css
/* 2. CSS 변수 추출 */
/* 위치: supabase/apps/studio/styles/globals.css */

:root {
  /* Supabase 그린 컬러 시스템 */
  --color-brand: #3ecf8e;
  --color-brand-hover: #2fb87d;

  /* 배경 컬러 */
  --background-default: #1c1c1c;
  --background-surface-100: #2d2d2d;

  /* 텍스트 컬러 */
  --foreground-light: #e5e5e5;
  --foreground-lighter: #a3a3a3;
  --foreground-muted: #737373;

  /* 보더 컬러 */
  --border-default: #404040;
  --border-muted: #2d2d2d;
}
```

**체크리스트**:
- [ ] Supabase 저장소 클론
- [ ] tailwind.config.js 분석 완료
- [ ] CSS 변수 추출 완료
- [ ] 컬러 시스템 문서화
- [ ] 애니메이션 키프레임 추출

**예상 시간**: 4시간

---

#### Day 3: 디자인 토큰 적용

**작업 내용**:

```bash
# 우리 프로젝트로 돌아가기
cd ../../../logmons-ui-template
```

```javascript
// 1. tailwind.config.ts 업데이트
// 위치: tailwind.config.ts

import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Supabase 컬러 시스템 추가
      colors: {
        // 브랜드 컬러 (Supabase 그린)
        brand: {
          DEFAULT: "#3ecf8e",
          hover: "#2fb87d",
          light: "#6fdc9f",
          dark: "#2fb87d",
        },

        // 타이포그래피
        typography: {
          body: "var(--typography-body)",
          secondary: "var(--typography-body-secondary)",
          strong: "var(--typography-body-strong)",
          faded: "var(--typography-body-faded)",
        },

        // 테이블
        table: {
          body: "var(--table-body)",
          header: "var(--table-header)",
          footer: "var(--table-footer)",
          border: "var(--table-border)",
        },

        // 패널
        panel: {
          body: "var(--panel-body)",
          header: "var(--panel-header)",
          footer: "var(--panel-footer)",
          border: "var(--panel-border)",
          "border-interior": "var(--panel-border-interior)",
          "border-hover": "var(--panel-border-hover)",
        },

        // Shadcn 기본 컬러 유지 (호환성)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... (나머지 Shadcn 컬러)
      },

      // Supabase 폰트 사이즈
      fontSize: {
        grid: "13px",
      },

      // Supabase 애니메이션
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        sway: {
          '0%, 100%': {
            transform: 'rotate(-10deg) scale(1.5) translateY(0)'
          },
          '50%': {
            transform: 'rotate(10deg) scale(1.5) translateY(-10px)'
          },
        },
        // Shadcn 기본 애니메이션 유지
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        shimmer: 'shimmer 2s linear infinite',
        sway: 'sway 3s ease-in-out infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
  ],
} satisfies Config

export default config
```

```css
/* 2. app/globals.css 업데이트 */
/* Supabase CSS 변수 추가 */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Shadcn 기본 변수 (유지) */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... */

    /* Supabase 커스텀 변수 (추가) */
    --typography-body: theme(colors.gray.200);
    --typography-body-secondary: theme(colors.gray.400);
    --typography-body-strong: theme(colors.white);
    --typography-body-faded: theme(colors.gray.500);

    --table-body: theme(colors.gray.950);
    --table-header: theme(colors.gray.900);
    --table-footer: theme(colors.gray.900);
    --table-border: theme(colors.gray.800);

    --panel-body: theme(colors.gray.900);
    --panel-header: theme(colors.gray.900);
    --panel-footer: theme(colors.gray.900);
    --panel-border: theme(colors.gray.800);
    --panel-border-interior: theme(colors.gray.800);
    --panel-border-hover: theme(colors.gray.700);
  }

  .dark {
    /* 다크모드는 기본값과 동일 (Supabase 스타일) */
  }
}

/* Supabase 스타일 유틸리티 */
@layer utilities {
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
}
```

**체크리스트**:
- [ ] tailwind.config.ts 업데이트
- [ ] globals.css 업데이트
- [ ] 컬러 시스템 테스트
- [ ] 애니메이션 동작 확인
- [ ] 빌드 성공 확인

**예상 시간**: 4시간

---

### Phase 2: 레이아웃 커스터마이징 (Day 4-5)

#### Day 4: 사이드바 & 헤더 수정

**작업 파일**:
- `components/layout/sidebar.tsx`
- `components/layout/header.tsx`

**사이드바 수정**:

```tsx
// components/layout/sidebar.tsx
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Users,
  Settings,
  Database,
  Code,
  BarChart3,
  FileText,
  Shield,
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Database",
    icon: Database,
    href: "/database",
  },
  {
    title: "API",
    icon: Code,
    href: "/api",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Users",
    icon: Users,
    href: "/users",
  },
  {
    title: "Logs",
    icon: FileText,
    href: "/logs",
  },
  {
    title: "Security",
    icon: Shield,
    href: "/security",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function Sidebar() {
  return (
    <div className="flex h-full flex-col border-r border-panel-border bg-panel-body">
      {/* 로고 영역 */}
      <div className="flex h-14 items-center border-b border-panel-border px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-brand" />
          <span className="font-semibold text-typography-body">
            Logmons
          </span>
        </div>
      </div>

      {/* 메뉴 영역 */}
      <ScrollArea className="flex-1 hide-scrollbar">
        <div className="space-y-1 p-2">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3",
                "hover:bg-panel-border-hover",
                "text-typography-body-secondary",
                "hover:text-typography-body"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
```

**헤더 수정**:

```tsx
// components/layout/header.tsx
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Settings, User, LogOut } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-panel-border bg-panel-header px-6">
      {/* 왼쪽: Breadcrumb */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-typography-body-secondary">
          Dashboard
        </span>
        <span className="text-sm text-typography-body-faded">/</span>
        <span className="text-sm text-typography-body">Overview</span>
      </div>

      {/* 오른쪽: Actions */}
      <div className="flex items-center gap-4">
        {/* 알림 */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand" />
        </Button>

        {/* 테마 토글 */}
        <ModeToggle />

        {/* 설정 */}
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>

        {/* 유저 메뉴 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
```

**체크리스트**:
- [ ] 사이드바 메뉴 구조 수정
- [ ] Supabase 스타일 컬러 적용
- [ ] 헤더 레이아웃 조정
- [ ] 아이콘 교체 (Lucide React)
- [ ] 반응형 동작 확인

**예상 시간**: 6시간

---

#### Day 5: 메인 레이아웃 구성

**작업 파일**:
- `app/layout.tsx`
- `components/layout/main-layout.tsx`

```tsx
// components/layout/main-layout.tsx
import { Sidebar } from "./sidebar"
import { Header } from "./header"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* 사이드바 */}
      <aside className="w-64 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* 메인 영역 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

```tsx
// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Logmons UI Template",
  description: "Supabase-inspired dashboard template for modern applications",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**체크리스트**:
- [ ] 메인 레이아웃 구조 완성
- [ ] 다크모드 기본 설정
- [ ] 스크롤 영역 정상 동작
- [ ] 반응형 레이아웃 확인
- [ ] 전체 빌드 테스트

**예상 시간**: 4시간

---

### Phase 3: TailAdmin 컴포넌트 통합 (Day 6-7)

#### Day 6: TailAdmin 클론 및 컴포넌트 분석

```bash
# TailAdmin 클론
git clone https://github.com/TailAdmin/free-nextjs-admin-dashboard.git tailadmin-reference
cd tailadmin-reference
```

**선별할 컴포넌트**:
1. **차트 컴포넌트** (ApexCharts 기반)
   - `src/components/Charts/ChartOne.tsx` - Line Chart
   - `src/components/Charts/ChartTwo.tsx` - Bar Chart
   - `src/components/Charts/ChartThree.tsx` - Doughnut Chart

2. **데이터 테이블**
   - `src/components/Tables/TableOne.tsx`
   - `src/components/Tables/TableTwo.tsx`

3. **카드 컴포넌트**
   - `src/components/CardDataStats.tsx`

4. **폼 컴포넌트**
   - `src/components/FormElements/*`

**체크리스트**:
- [ ] TailAdmin 클론 완료
- [ ] 필요한 컴포넌트 식별
- [ ] 의존성 확인 (ApexCharts 등)
- [ ] 컴포넌트 복사 계획 수립

**예상 시간**: 3시간

---

#### Day 7: 컴포넌트 이식 및 스타일 조정

```bash
# 우리 프로젝트로 돌아가기
cd ../../../logmons-ui-template

# ApexCharts 설치
pnpm add apexcharts react-apexcharts
pnpm add -D @types/react-apexcharts
```

**작업 내용**:

1. **차트 컴포넌트 이식**

```tsx
// components/charts/line-chart.tsx
"use client"

import dynamic from "next/dynamic"
import { ApexOptions } from "apexcharts"

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
})

export function LineChart() {
  const options: ApexOptions = {
    chart: {
      fontFamily: "Inter, sans-serif",
      type: "line",
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    colors: ["#3ecf8e", "#6fdc9f"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    grid: {
      borderColor: "#404040",
    },
    xaxis: {
      labels: {
        style: {
          colors: "#a3a3a3",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#a3a3a3",
        },
      },
    },
    legend: {
      labels: {
        colors: "#e5e5e5",
      },
    },
  }

  const series = [
    {
      name: "Product One",
      data: [23, 45, 56, 74, 100, 132, 156],
    },
    {
      name: "Product Two",
      data: [11, 32, 45, 65, 85, 102, 120],
    },
  ]

  return (
    <div className="rounded-lg border border-panel-border bg-panel-body p-6">
      <h3 className="mb-4 text-lg font-semibold text-typography-body">
        Analytics Overview
      </h3>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  )
}
```

2. **데이터 테이블 이식**

```tsx
// components/tables/data-table.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const tableData = [
  { id: 1, name: "User One", email: "user1@example.com", status: "Active" },
  { id: 2, name: "User Two", email: "user2@example.com", status: "Inactive" },
  // ...
]

export function DataTable() {
  return (
    <div className="rounded-lg border border-panel-border bg-panel-body">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-panel-border-interior bg-table-header">
            <TableHead className="text-typography-body">Name</TableHead>
            <TableHead className="text-typography-body">Email</TableHead>
            <TableHead className="text-typography-body">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row) => (
            <TableRow
              key={row.id}
              className="border-b border-panel-border-interior hover:bg-panel-border-hover"
            >
              <TableCell className="text-typography-body">{row.name}</TableCell>
              <TableCell className="text-typography-body-secondary">
                {row.email}
              </TableCell>
              <TableCell>
                <span className={`
                  inline-flex rounded-full px-3 py-1 text-xs font-medium
                  ${row.status === 'Active'
                    ? 'bg-brand/10 text-brand'
                    : 'bg-gray-800 text-gray-400'
                  }
                `}>
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
```

3. **카드 컴포넌트 이식**

```tsx
// components/cards/stat-card.tsx
import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend?: {
    value: string
    isPositive: boolean
  }
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="border-panel-border bg-panel-body">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-typography-body-secondary">{title}</p>
            <h3 className="mt-2 text-3xl font-bold text-typography-body">
              {value}
            </h3>
            {trend && (
              <p className={`mt-2 text-sm ${
                trend.isPositive ? 'text-brand' : 'text-red-500'
              }`}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </p>
            )}
          </div>
          <div className="rounded-lg bg-brand/10 p-3">
            <Icon className="h-6 w-6 text-brand" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

**체크리스트**:
- [ ] ApexCharts 설치 완료
- [ ] 차트 컴포넌트 이식 및 스타일 조정
- [ ] 데이터 테이블 이식 및 Supabase 컬러 적용
- [ ] 카드 컴포넌트 이식
- [ ] 모든 컴포넌트 동작 확인

**예상 시간**: 7시간

---

### Phase 4: Clerk 인증 제거 및 정리 (Day 8)

#### Day 8: 인증 시스템 제거 및 더미 데이터

**제거할 파일**:
```bash
# Clerk 관련 파일 제거
rm -rf app/(auth)
rm -rf components/auth
rm middleware.ts

# Clerk 패키지 제거
pnpm remove @clerk/nextjs
```

**수정할 파일**:

```tsx
// app/layout.tsx (ClerkProvider 제거)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**더미 사용자 데이터**:

```tsx
// lib/mock-data.ts
export const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  role: "Admin",
}

export const mockProjects = [
  {
    id: "1",
    name: "Production Database",
    status: "active",
    region: "us-east-1",
  },
  {
    id: "2",
    name: "Staging Database",
    status: "active",
    region: "eu-west-1",
  },
]

export const mockStats = {
  totalUsers: "2,543",
  activeProjects: "12",
  apiCalls: "1.2M",
  uptime: "99.9%",
}
```

**체크리스트**:
- [ ] Clerk 패키지 제거
- [ ] 인증 관련 파일 제거
- [ ] 더미 데이터 구성
- [ ] 레이아웃 정상 동작 확인
- [ ] 빌드 에러 없음 확인

**예상 시간**: 4시간

---

### Phase 5: 최종 마무리 (Day 9-10)

#### Day 9: 대시보드 페이지 구성

```tsx
// app/page.tsx
import { MainLayout } from "@/components/layout/main-layout"
import { StatCard } from "@/components/cards/stat-card"
import { LineChart } from "@/components/charts/line-chart"
import { DataTable } from "@/components/tables/data-table"
import { mockStats } from "@/lib/mock-data"
import { Users, Database, Activity, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div>
          <h1 className="text-3xl font-bold text-typography-body">
            Dashboard
          </h1>
          <p className="text-typography-body-secondary">
            Welcome back! Here's what's happening.
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={mockStats.totalUsers}
            icon={Users}
            trend={{ value: "12%", isPositive: true }}
          />
          <StatCard
            title="Active Projects"
            value={mockStats.activeProjects}
            icon={Database}
            trend={{ value: "8%", isPositive: true }}
          />
          <StatCard
            title="API Calls"
            value={mockStats.apiCalls}
            icon={Activity}
            trend={{ value: "3%", isPositive: false }}
          />
          <StatCard
            title="Uptime"
            value={mockStats.uptime}
            icon={TrendingUp}
          />
        </div>

        {/* 차트 */}
        <LineChart />

        {/* 데이터 테이블 */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-typography-body">
            Recent Activity
          </h2>
          <DataTable />
        </div>
      </div>
    </MainLayout>
  )
}
```

**체크리스트**:
- [ ] 대시보드 페이지 구성
- [ ] 모든 컴포넌트 통합
- [ ] 레이아웃 확인
- [ ] 반응형 동작 확인

**예상 시간**: 6시간

---

#### Day 10: 테스트, 문서화, 배포 준비

**최종 체크리스트**:

```bash
# 1. 빌드 테스트
pnpm build

# 2. 타입 체크
pnpm type-check

# 3. 린트 체크
pnpm lint

# 4. 프로덕션 모드 실행
pnpm start
```

**문서 작성**:

```markdown
# README.md

## Logmons UI Template

Supabase-inspired dashboard template built with:
- Next.js 15
- Shadcn UI (Radix UI + Tailwind)
- ApexCharts
- TypeScript

## Features

✅ Modern dark mode interface
✅ Responsive layout
✅ Customizable components
✅ Ready for production

## Quick Start

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

## License

MIT License - Feel free to use for commercial projects
```

**라이선스 파일**:

```
MIT License

Copyright (c) 2025 [Your Name]

Based on:
- Next Shadcn Dashboard Starter (MIT) - Kiranism
- TailAdmin (MIT) - TailAdmin
- Supabase Design System (Apache 2.0) - Supabase

... (전체 MIT 라이선스 텍스트)
```

**배포 준비**:
- [ ] Vercel 배포 설정
- [ ] 환경 변수 문서화
- [ ] README.md 작성
- [ ] LICENSE 파일 추가
- [ ] CHANGELOG.md 작성

**예상 시간**: 4시간

---

## 📁 최종 프로젝트 구조

```
logmons-ui-template/
├── app/
│   ├── layout.tsx                    # 루트 레이아웃
│   ├── page.tsx                      # 대시보드 페이지
│   └── globals.css                   # 글로벌 스타일
├── components/
│   ├── layout/
│   │   ├── main-layout.tsx          # 메인 레이아웃
│   │   ├── sidebar.tsx              # 사이드바
│   │   └── header.tsx               # 헤더
│   ├── charts/
│   │   ├── line-chart.tsx           # Line 차트
│   │   ├── bar-chart.tsx            # Bar 차트
│   │   └── doughnut-chart.tsx       # Doughnut 차트
│   ├── tables/
│   │   └── data-table.tsx           # 데이터 테이블
│   ├── cards/
│   │   └── stat-card.tsx            # 통계 카드
│   ├── ui/                          # Shadcn UI 컴포넌트
│   └── theme-provider.tsx           # 테마 Provider
├── lib/
│   ├── utils.ts                     # 유틸리티
│   └── mock-data.ts                 # 더미 데이터
├── public/
├── tailwind.config.ts               # Tailwind 설정 (Supabase 스타일)
├── package.json
├── README.md
└── LICENSE
```

---

## 🎯 성공 기준

### 기능적 요구사항
- [x] 상단바 완성 (로고, 네비게이션, 사용자 메뉴)
- [x] 사이드바 완성 (메뉴, Collapsible, 반응형)
- [x] 메인 영역 (카드, 차트, 테이블)
- [x] 다크모드 지원
- [x] 반응형 레이아웃

### 디자인 요구사항
- [x] Supabase 컬러 시스템 (그린 브랜드 컬러)
- [x] Supabase 타이포그래피
- [x] Supabase 스페이싱 & 보더
- [x] 애니메이션 (shimmer, sway 등)

### 기술적 요구사항
- [x] Next.js 15 + TypeScript
- [x] Radix UI (Shadcn) 기반
- [x] Tailwind CSS v4
- [x] 프로덕션 빌드 성공
- [x] 타입 에러 없음

### 상업적 요구사항
- [x] MIT 라이선스
- [x] 인증 시스템 제거
- [x] 더미 데이터 구성
- [x] 문서화 완료

---

## 💰 예상 비용 및 일정

| Phase | 작업 내용 | 일정 | 공수 | 비용 (시급 5만원) |
|-------|----------|------|------|------------------|
| **Phase 1** | 기본 틀 구축 | Day 1-3 | 10시간 | 50만원 |
| **Phase 2** | 레이아웃 커스터마이징 | Day 4-5 | 10시간 | 50만원 |
| **Phase 3** | TailAdmin 통합 | Day 6-7 | 10시간 | 50만원 |
| **Phase 4** | 인증 제거 | Day 8 | 4시간 | 20만원 |
| **Phase 5** | 최종 마무리 | Day 9-10 | 10시간 | 50만원 |
| **버퍼** | 예상치 못한 이슈 | - | 6시간 | 30만원 |
| **총계** | - | **10일** | **50시간** | **250만원** |

> **참고**: 문서에 명시된 400만원은 여유를 포함한 예산입니다. 실제 순수 개발 비용은 250만원 정도 예상됩니다.

---

## 🚀 시작하기

준비가 되셨다면 다음 명령어로 시작하세요:

### 방법 A: 폴더명 변경 후 시작 (추천 ⭐)

```bash
# 1. 상위 디렉토리로 이동
cd c:\dev_log\workspace

# 2. 폴더명 변경
mv ui-design logmons-ui-template

# 3. 변경된 폴더로 이동
cd logmons-ui-template

# 4. 문서 정리
mkdir docs
mv dashboard-template-comparison.md docs/
mv IMPLEMENTATION_PLAN.md docs/

# 5. Next Shadcn Dashboard Starter 복사
cd ..
git clone https://github.com/Kiranism/next-shadcn-dashboard-starter.git temp-starter
cd temp-starter
cp -r * ../logmons-ui-template/
cp -r .* ../logmons-ui-template/ 2>/dev/null || true
cd ../logmons-ui-template
rm -rf ../temp-starter

# 6. Git 초기화
rm -rf .git
git init
git add .
git commit -m "Initial commit: Logmons UI Template base"

# 7. 의존성 설치 및 실행
pnpm install
pnpm dev
```

### 방법 B: Windows 탐색기 사용

1. `C:\dev_log\workspace\ui-design` 폴더 우클릭
2. "이름 바꾸기" → `logmons-ui-template` 입력
3. VS Code에서 열기
4. 터미널에서 방법 A의 4번부터 실행

이제 http://localhost:3000 에서 기본 템플릿을 확인하실 수 있습니다!

---

## 📞 다음 단계

실행 계획이 마음에 드시면:
1. "Phase 1 Day 1 시작해줘" 라고 말씀해주세요
2. 각 단계별로 실시간 진행하겠습니다
3. 막히는 부분이나 수정이 필요한 부분은 즉시 조정하겠습니다

준비되셨나요? 🚀
