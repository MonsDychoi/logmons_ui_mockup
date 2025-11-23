# LogMons 수집관리 API 문서

## 기본 정보
- **Base URL**: `http://localhost:3002/api/collection`
- **Response Format**: JSON
- **Authentication**: 없음 (개발 환경)

## API 엔드포인트

### 1. Agents (수집 에이전트)

#### GET /api/collection/agents
모든 에이전트 조회

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Log-01",
      "server_ip": "10.0.0.1",
      "version": "v2.4.1",
      "install_path": "/opt/logmons/agent",
      "status": "normal",
      "collection_rate": "98.5%",
      "processed_events": 1234567,
      "error_rate": "0.2%",
      "last_connection": "2025-11-18T06:15:28.233534+00:00",
      "created_at": "2025-11-18T06:16:28.233534+00:00",
      "updated_at": "2025-11-18T06:16:28.233534+00:00"
    }
  ]
}
```

#### POST /api/collection/agents
새 에이전트 생성

**Request Body**:
```json
{
  "name": "Log-06",
  "server_ip": "10.0.0.4",
  "version": "v2.5.0",
  "install_path": "/opt/logmons/agent",
  "status": "inactive"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "id": "generated-uuid",
    "name": "Log-06",
    ...
  }
}
```

#### PUT /api/collection/agents
에이전트 업데이트

**Request Body**:
```json
{
  "id": "agent-uuid",
  "status": "normal",
  "collection_rate": "99.5%"
}
```

**Response**:
```json
{
  "success": true,
  "data": { ... }
}
```

#### DELETE /api/collection/agents?id={uuid}
에이전트 삭제

**Query Parameters**:
- `id` (required): 에이전트 UUID

**Response**:
```json
{
  "success": true,
  "message": "Agent deleted successfully"
}
```

---

### 2. Channels (전송 채널)

#### GET /api/collection/channels
모든 채널 조회

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "channel_name": "log-collection-01",
      "topic_name": "logs.application",
      "partitions": 3,
      "offset_value": 1234567,
      "status": "normal",
      "message_rate": "1.2K msg/s",
      "broker_config": null,
      "created_at": "2025-11-18T06:16:28.233534+00:00",
      "updated_at": "2025-11-18T06:16:28.233534+00:00"
    }
  ]
}
```

#### POST /api/collection/channels
새 채널 생성

**Request Body**:
```json
{
  "channel_name": "log-collection-11",
  "topic_name": "logs.custom",
  "partitions": 2,
  "offset_value": 0,
  "status": "inactive"
}
```

#### PUT /api/collection/channels
채널 업데이트

**Request Body**:
```json
{
  "id": "channel-uuid",
  "status": "normal",
  "message_rate": "2.5K msg/s"
}
```

#### DELETE /api/collection/channels?id={uuid}
채널 삭제

---

### 3. Targets (수집 대상)

#### GET /api/collection/targets
모든 수집 대상 조회

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "agent_id": "agent-uuid",
      "name": "/var/log/application.log",
      "type": "file",
      "status": "normal",
      "size": "2.3GB",
      "last_collected": "2025-11-18T06:15:28.233534+00:00",
      "collection_config": null,
      "created_at": "2025-11-18T06:16:28.233534+00:00",
      "updated_at": "2025-11-18T06:16:28.233534+00:00"
    }
  ]
}
```

#### POST /api/collection/targets
새 수집 대상 생성

**Request Body**:
```json
{
  "agent_id": "agent-uuid",
  "name": "/var/log/custom.log",
  "type": "file",
  "status": "inactive"
}
```

#### PUT /api/collection/targets
수집 대상 업데이트

**Request Body**:
```json
{
  "id": "target-uuid",
  "status": "normal",
  "size": "3.5GB"
}
```

#### DELETE /api/collection/targets?id={uuid}
수집 대상 삭제

---

### 4. Deployments (배포 이력)

#### GET /api/collection/deployments
모든 배포 이력 조회

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "agent_id": "agent-uuid",
      "deployment_type": "install",
      "version": "v2.4.1",
      "status": "completed",
      "started_at": "2025-11-11T06:16:28.233534+00:00",
      "completed_at": "2025-11-11T06:21:28.233534+00:00",
      "error_message": null,
      "deployed_by": "admin",
      "deployment_config": null,
      "created_at": "2025-11-18T06:16:28.233534+00:00",
      "updated_at": "2025-11-18T06:16:28.233534+00:00"
    }
  ]
}
```

#### POST /api/collection/deployments
새 배포 이력 생성

**Request Body**:
```json
{
  "agent_id": "agent-uuid",
  "deployment_type": "update",
  "version": "v2.5.0",
  "status": "pending",
  "deployed_by": "admin"
}
```

#### PUT /api/collection/deployments
배포 이력 업데이트

**Request Body**:
```json
{
  "id": "deployment-uuid",
  "status": "completed",
  "completed_at": "2025-11-18T07:00:00.000Z"
}
```

#### DELETE /api/collection/deployments?id={uuid}
배포 이력 삭제

---

### 5. Backup (백업)

#### GET /api/collection/backup
전체 데이터 JSON 백업 다운로드

**Response**: JSON 파일 다운로드
```json
{
  "version": "1.0.0",
  "exported_at": "2025-11-18T06:20:34.350Z",
  "data": {
    "agents": [...],
    "targets": [...],
    "channels": [...],
    "deployments": [...],
    "agent_activities": [...]
  }
}
```

---

## Status Values

### Agent/Target/Channel Status
- `normal` - 정상
- `disconnected` - 연결 끊김
- `error` - 에러
- `warning` - 경고
- `inactive` - 비활성

### Deployment Status
- `pending` - 대기 중
- `in_progress` - 진행 중
- `completed` - 완료
- `failed` - 실패

### Deployment Types
- `install` - 설치
- `update` - 업데이트
- `uninstall` - 제거

---

## 사용 예시

### JavaScript/TypeScript
```typescript
// SELECT
const response = await fetch('/api/collection/agents');
const { success, data } = await response.json();

// INSERT
const newAgent = await fetch('/api/collection/agents', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Log-06',
    server_ip: '10.0.0.4',
    status: 'inactive'
  })
});

// UPDATE
const updated = await fetch('/api/collection/agents', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 'agent-uuid',
    status: 'normal'
  })
});

// DELETE
const deleted = await fetch('/api/collection/agents?id=agent-uuid', {
  method: 'DELETE'
});
```

### curl
```bash
# SELECT
curl http://localhost:3002/api/collection/agents

# INSERT
curl -X POST http://localhost:3002/api/collection/agents \
  -H "Content-Type: application/json" \
  -d '{"name":"Log-06","server_ip":"10.0.0.4","status":"inactive"}'

# UPDATE
curl -X PUT http://localhost:3002/api/collection/agents \
  -H "Content-Type: application/json" \
  -d '{"id":"agent-uuid","status":"normal"}'

# DELETE
curl -X DELETE "http://localhost:3002/api/collection/agents?id=agent-uuid"

# BACKUP
curl http://localhost:3002/api/collection/backup -o backup.json
```

---

## 에러 응답

모든 에러는 다음 형식으로 반환됩니다:

```json
{
  "success": false,
  "error": "Error message here"
}
```

HTTP Status Codes:
- `200` - 성공 (GET, PUT, DELETE)
- `201` - 생성 성공 (POST)
- `400` - 잘못된 요청
- `500` - 서버 에러
