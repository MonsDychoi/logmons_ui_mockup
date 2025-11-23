# Supabase 연결 완료

## 설정된 내용

### 1. 환경 변수 (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=https://ixclldmqyhozdxdfnlcz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
```

### 2. 설치된 패키지
- `@supabase/supabase-js` - Supabase JavaScript 클라이언트
- `@supabase/ssr` - Next.js SSR 헬퍼

### 3. 생성된 파일

#### Client-side (Browser)
- `src/lib/supabase/client.ts` - 클라이언트 컴포넌트용

```typescript
import { createClient } from '@/lib/supabase/client';

export function MyComponent() {
  const supabase = createClient();
  // 브라우저에서 Supabase 사용
}
```

#### Server-side (Server Components, API Routes)
- `src/lib/supabase/server.ts` - 서버 컴포넌트/API 라우트용

```typescript
import { createClient } from '@/lib/supabase/server';

export async function MyServerComponent() {
  const supabase = await createClient();
  // 서버에서 Supabase 사용
}
```

#### Middleware
- `src/lib/supabase/middleware.ts` - 세션 갱신용 (옵션)

### 4. 테스트 API
- `/api/test-supabase` - 연결 테스트 엔드포인트

방문: http://localhost:3002/api/test-supabase

## 사용 예제

### 클라이언트 컴포넌트에서 데이터 조회
```typescript
'use client';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export function MyComponent() {
  const [data, setData] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('your_table')
        .select('*');

      if (data) setData(data);
    }
    fetchData();
  }, []);

  return <div>{/* 데이터 표시 */}</div>;
}
```

### 서버 컴포넌트에서 데이터 조회
```typescript
import { createClient } from '@/lib/supabase/server';

export default async function MyPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('your_table')
    .select('*');

  return <div>{/* 데이터 표시 */}</div>;
}
```

### API 라우트에서 데이터 삽입
```typescript
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from('your_table')
    .insert(body);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
```

## 다음 단계

1. **Supabase 대시보드에서 테이블 생성**
   - https://supabase.com/dashboard/project/ixclldmqyhozdxdfnlcz/editor

2. **Row Level Security (RLS) 설정**
   - 테이블별 접근 권한 정책 설정

3. **인증 설정 (필요시)**
   - 이메일/비밀번호, OAuth 등

4. **실시간 구독 사용 (필요시)**
   ```typescript
   supabase
     .channel('table-changes')
     .on('postgres_changes',
       { event: '*', schema: 'public', table: 'your_table' },
       (payload) => console.log(payload)
     )
     .subscribe();
   ```

## 연결 상태 확인

✅ Supabase URL: https://ixclldmqyhozdxdfnlcz.supabase.co
✅ Anon Key 설정 완료
✅ Service Role Key 설정 완료
✅ 클라이언트 초기화 성공
