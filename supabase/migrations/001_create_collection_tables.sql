-- LogMons 수집관리 테이블 생성
-- 작성일: 2025-11-18

-- 1. 수집 에이전트 테이블
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  server_ip VARCHAR(45) NOT NULL,
  version VARCHAR(50),
  install_path TEXT,
  status VARCHAR(50) DEFAULT 'inactive' CHECK (status IN ('normal', 'disconnected', 'error', 'warning', 'inactive')),
  collection_rate VARCHAR(10),
  processed_events BIGINT DEFAULT 0,
  error_rate VARCHAR(10),
  last_connection TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 수집 대상 테이블
CREATE TABLE IF NOT EXISTS targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- 파일 경로 또는 대상명
  type VARCHAR(50) DEFAULT 'file', -- file, directory, syslog, etc.
  status VARCHAR(50) DEFAULT 'inactive' CHECK (status IN ('normal', 'disconnected', 'error', 'warning', 'inactive')),
  size VARCHAR(50),
  last_collected TIMESTAMP WITH TIME ZONE,
  collection_config JSONB, -- 수집 설정 (interval, filter, etc.)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Kafka 전송 채널 테이블
CREATE TABLE IF NOT EXISTS channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_name VARCHAR(255) NOT NULL UNIQUE,
  topic_name VARCHAR(255) NOT NULL,
  partitions INTEGER DEFAULT 1,
  offset_value BIGINT DEFAULT 0,
  status VARCHAR(50) DEFAULT 'inactive' CHECK (status IN ('normal', 'disconnected', 'error', 'warning', 'inactive')),
  message_rate VARCHAR(50),
  broker_config JSONB, -- Kafka broker 설정
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 배포 이력 테이블
CREATE TABLE IF NOT EXISTS deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  deployment_type VARCHAR(50) NOT NULL, -- install, update, uninstall
  version VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  deployed_by VARCHAR(255),
  deployment_config JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 에이전트 활동 로그 테이블
CREATE TABLE IF NOT EXISTS agent_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  result VARCHAR(50) CHECK (result IN ('success', 'failed', 'warning')),
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_agents_status ON agents(status);
CREATE INDEX idx_agents_name ON agents(name);
CREATE INDEX idx_targets_agent_id ON targets(agent_id);
CREATE INDEX idx_targets_status ON targets(status);
CREATE INDEX idx_channels_status ON channels(status);
CREATE INDEX idx_channels_topic ON channels(topic_name);
CREATE INDEX idx_deployments_agent_id ON deployments(agent_id);
CREATE INDEX idx_deployments_status ON deployments(status);
CREATE INDEX idx_agent_activities_agent_id ON agent_activities(agent_id);
CREATE INDEX idx_agent_activities_created_at ON agent_activities(created_at DESC);

-- Updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Updated_at 트리거 생성
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_targets_updated_at BEFORE UPDATE ON targets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_channels_updated_at BEFORE UPDATE ON channels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deployments_updated_at BEFORE UPDATE ON deployments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) 활성화
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_activities ENABLE ROW LEVEL SECURITY;

-- 기본 정책: 모든 사용자가 읽기/쓰기 가능 (인증 구현 시 수정 필요)
CREATE POLICY "Enable read access for all users" ON agents FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON agents FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON agents FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON agents FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON targets FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON targets FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON targets FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON targets FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON channels FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON channels FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON channels FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON channels FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON deployments FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON deployments FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON deployments FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON deployments FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON agent_activities FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON agent_activities FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON agent_activities FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON agent_activities FOR DELETE USING (true);
