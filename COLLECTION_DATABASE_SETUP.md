# 수집관리 데이터베이스 설정 가이드

## 1. Supabase 테이블 생성

### 방법 1: Supabase SQL Editor 사용 (권장)

1. Supabase 대시보드 접속
   - https://supabase.com/dashboard/project/ixclldmqyhozdxdfnlcz/editor

2. 왼쪽 메뉴에서 **SQL Editor** 클릭

3. **New Query** 버튼 클릭

4. `supabase/migrations/001_create_collection_tables.sql` 파일 내용 복사

5. SQL Editor에 붙여넣기 후 **Run** 버튼 클릭

6. 샘플 데이터 삽입 (선택사항)
   - `supabase/migrations/002_insert_sample_data.sql` 파일 내용 복사
   - 새 쿼리 생성 후 실행

### 방법 2: Supabase CLI 사용

```bash
# Supabase CLI 설치 (없는 경우)
npm install -g supabase

# Supabase 프로젝트 연결
supabase link --project-ref ixclldmqyhozdxdfnlcz

# 마이그레이션 실행
supabase db push
```

## 2. 생성된 테이블 구조

### agents (수집 에이전트)
- `id` - UUID (Primary Key)
- `name` - 에이전트명 (Unique)
- `server_ip` - 서버 IP
- `version` - 에이전트 버전
- `install_path` - 설치 경로
- `status` - 상태 (normal, disconnected, error, warning, inactive)
- `collection_rate` - 수집률
- `processed_events` - 처리된 이벤트 수
- `error_rate` - 에러율
- `last_connection` - 마지막 연결 시각
- `created_at`, `updated_at` - 생성/수정 시각

### targets (수집 대상)
- `id` - UUID (Primary Key)
- `agent_id` - 에이전트 ID (Foreign Key)
- `name` - 대상명 (파일 경로 등)
- `type` - 대상 유형 (file, directory, syslog 등)
- `status` - 상태
- `size` - 크기
- `last_collected` - 마지막 수집 시각
- `collection_config` - 수집 설정 (JSONB)
- `created_at`, `updated_at`

### channels (Kafka 전송 채널)
- `id` - UUID (Primary Key)
- `channel_name` - 채널명 (Unique)
- `topic_name` - Kafka 토픽명
- `partitions` - 파티션 수
- `offset_value` - 오프셋 값
- `status` - 상태
- `message_rate` - 메시지 전송률
- `broker_config` - 브로커 설정 (JSONB)
- `created_at`, `updated_at`

### deployments (배포 이력)
- `id` - UUID (Primary Key)
- `agent_id` - 에이전트 ID (Foreign Key)
- `deployment_type` - 배포 유형 (install, update, uninstall)
- `version` - 버전
- `status` - 상태 (pending, in_progress, completed, failed)
- `started_at`, `completed_at` - 시작/완료 시각
- `error_message` - 에러 메시지
- `deployed_by` - 배포자
- `deployment_config` - 배포 설정 (JSONB)
- `created_at`, `updated_at`

### agent_activities (에이전트 활동 로그)
- `id` - UUID (Primary Key)
- `agent_id` - 에이전트 ID (Foreign Key)
- `action` - 활동 유형
- `result` - 결과 (success, failed, warning)
- `details` - 상세 내용
- `created_at` - 생성 시각

## 3. JSON 백업/복원 시스템

### 자동 백업
데이터 생성/수정/삭제 시 자동으로 JSON 파일로 백업됩니다:
- 위치: `data/backups/collection-latest.json`
- 일자별 백업: `data/backups/collection-backup-YYYY-MM-DD.json`

### 수동 백업 (API 사용)
```bash
# JSON 다운로드
curl http://localhost:3002/api/collection/backup -o backup.json
```

### 백업 파일 형식
```json
{
  "version": "1.0.0",
  "exported_at": "2025-11-18T06:00:00.000Z",
  "data": {
    "agents": [...],
    "targets": [...],
    "channels": [...],
    "deployments": [...],
    "agent_activities": [...]
  }
}
```

## 4. 코드에서 사용하기

### TypeScript 타입
```typescript
import type { Agent, Target, Channel } from '@/types/collection';
```

### 서비스 사용
```typescript
import { AgentService, ChannelService, TargetService } from '@/lib/collection/service';

// 에이전트 목록 조회
const agents = await AgentService.getAll();

// 에이전트 생성
const newAgent = await AgentService.create({
  name: 'Log-06',
  server_ip: '10.0.0.4',
  status: 'inactive'
});

// 채널 통계
const stats = await ChannelService.getStats();
```

### 직접 Supabase 사용
```typescript
import { createClient } from '@/lib/supabase/server';

export async function getAgents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('status', 'normal');

  return data;
}
```

## 5. 데이터 검증

테이블 생성 확인:
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('agents', 'targets', 'channels', 'deployments', 'agent_activities');
```

샘플 데이터 확인:
```sql
SELECT COUNT(*) as agent_count FROM agents;
SELECT COUNT(*) as target_count FROM targets;
SELECT COUNT(*) as channel_count FROM channels;
```

## 6. 보안 설정

현재 RLS (Row Level Security) 정책:
- **모든 사용자**: 읽기/쓰기 가능 (개발 환경용)

**프로덕션 환경에서는 반드시 정책 수정 필요!**

예시 (인증된 사용자만 접근):
```sql
-- 기존 정책 삭제
DROP POLICY IF EXISTS "Enable read access for all users" ON agents;
DROP POLICY IF EXISTS "Enable insert access for all users" ON agents;

-- 새 정책 생성
CREATE POLICY "Enable read for authenticated users" ON agents
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON agents
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

## 7. 트러블슈팅

### 테이블 생성 실패
- UUID 확장 필요: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
- 권한 확인: Supabase 프로젝트 소유자 권한 필요

### 백업 실패
- `data/backups` 디렉토리 권한 확인
- Node.js 버전 확인 (v18 이상 권장)

### 연결 실패
- `.env.local` 파일 확인
- Supabase URL/Key 재확인
- 서버 재시작 (`npm run dev` 다시 실행)

## 8. 다음 단계

✅ 테이블 생성 완료
✅ JSON 백업 시스템 구축 완료
⬜ 실시간 구독 설정 (선택사항)
⬜ UI 컴포넌트와 연동
⬜ 대시보드 통계 구현

자세한 Supabase 사용법: https://supabase.com/docs
