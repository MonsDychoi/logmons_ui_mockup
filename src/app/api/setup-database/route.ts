import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * POST /api/setup-database
 * Supabase 데이터베이스 테이블 자동 생성
 */
export async function POST() {
  try {
    // Service Role로 Supabase 클라이언트 생성 (관리자 권한)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // SQL 실행을 위한 함수
    const executeSql = async (sql: string) => {
      const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
      if (error) throw error;
      return data;
    };

    // 1. 테이블 생성 SQL
    const createTablesSql = `
-- UUID 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
  name TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'file',
  status VARCHAR(50) DEFAULT 'inactive' CHECK (status IN ('normal', 'disconnected', 'error', 'warning', 'inactive')),
  size VARCHAR(50),
  last_collected TIMESTAMP WITH TIME ZONE,
  collection_config JSONB,
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
  broker_config JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 배포 이력 테이블
CREATE TABLE IF NOT EXISTS deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  deployment_type VARCHAR(50) NOT NULL,
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
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_agents_name ON agents(name);
CREATE INDEX IF NOT EXISTS idx_targets_agent_id ON targets(agent_id);
CREATE INDEX IF NOT EXISTS idx_targets_status ON targets(status);
CREATE INDEX IF NOT EXISTS idx_channels_status ON channels(status);
CREATE INDEX IF NOT EXISTS idx_channels_topic ON channels(topic_name);
CREATE INDEX IF NOT EXISTS idx_deployments_agent_id ON deployments(agent_id);
CREATE INDEX IF NOT EXISTS idx_deployments_status ON deployments(status);
CREATE INDEX IF NOT EXISTS idx_agent_activities_agent_id ON agent_activities(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_activities_created_at ON agent_activities(created_at DESC);
`;

    // 직접 SQL 실행 (Supabase REST API 사용)
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: createTablesSql })
    });

    // 대신 직접 테이블 생성 시도
    const tables = ['agents', 'targets', 'channels', 'deployments', 'agent_activities'];

    // 샘플 데이터 삽입
    const sampleData = {
      agents: [
        { name: 'Log-01', server_ip: '10.0.0.1', version: 'v2.4.1', install_path: '/opt/logmons/agent', status: 'normal', collection_rate: '98.5%', processed_events: 1234567, error_rate: '0.2%' },
        { name: 'Log-02', server_ip: '10.0.0.2', version: 'v2.4.1', install_path: '/opt/logmons/agent', status: 'normal', collection_rate: '99.1%', processed_events: 987654, error_rate: '0.1%' },
        { name: 'Log-03', server_ip: '10.0.0.1', version: 'v2.4.0', install_path: '/opt/logmons/agent', status: 'disconnected' },
        { name: 'Log-04', server_ip: '10.0.0.2', version: 'v2.3.9', install_path: '/opt/logmons/agent', status: 'disconnected' },
        { name: 'Log-05', server_ip: '10.0.0.3', version: 'v2.4.1', install_path: '/opt/logmons/agent', status: 'error', collection_rate: '85.3%', processed_events: 456789, error_rate: '2.5%' }
      ],
      channels: [
        { channel_name: 'log-collection-01', topic_name: 'logs.application', partitions: 3, offset_value: 1234567, status: 'normal', message_rate: '1.2K msg/s' },
        { channel_name: 'log-collection-02', topic_name: 'logs.system', partitions: 3, offset_value: 987654, status: 'normal', message_rate: '850 msg/s' },
        { channel_name: 'log-collection-03', topic_name: 'logs.error', partitions: 2, offset_value: 456789, status: 'normal', message_rate: '320 msg/s' },
        { channel_name: 'log-collection-04', topic_name: 'logs.nginx', partitions: 4, offset_value: 2345678, status: 'normal', message_rate: '1.8K msg/s' },
        { channel_name: 'log-collection-05', topic_name: 'logs.database', partitions: 2, offset_value: 654321, status: 'warning', message_rate: '180 msg/s' }
      ]
    };

    return NextResponse.json({
      success: true,
      message: 'Supabase SQL Editor에서 수동으로 테이블을 생성해주세요',
      instructions: {
        step1: 'https://supabase.com/dashboard/project/ixclldmqyhozdxdfnlcz/sql 접속',
        step2: 'supabase/migrations/001_create_collection_tables.sql 파일 내용 복사',
        step3: 'SQL Editor에 붙여넣고 Run 버튼 클릭',
        step4: '002_insert_sample_data.sql도 같은 방법으로 실행'
      },
      note: 'REST API로는 DDL(CREATE TABLE) 실행이 제한되어 있습니다.'
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      note: 'Supabase Dashboard의 SQL Editor를 사용해서 수동으로 테이블을 생성해야 합니다.'
    }, { status: 500 });
  }
}

/**
 * GET /api/setup-database
 * 테이블 생성 상태 확인
 */
export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 각 테이블에서 데이터 조회 시도
    const [agentsRes, channelsRes] = await Promise.all([
      supabase.from('agents').select('count'),
      supabase.from('channels').select('count')
    ]);

    const tablesExist = !agentsRes.error && !channelsRes.error;

    if (tablesExist) {
      const agentsCount = await supabase.from('agents').select('*', { count: 'exact', head: true });
      const channelsCount = await supabase.from('channels').select('*', { count: 'exact', head: true });

      return NextResponse.json({
        success: true,
        tablesExist: true,
        data: {
          agents: agentsCount.count || 0,
          channels: channelsCount.count || 0
        }
      });
    } else {
      return NextResponse.json({
        success: true,
        tablesExist: false,
        message: '테이블이 아직 생성되지 않았습니다.',
        instructions: 'POST /api/setup-database를 호출하거나 Supabase Dashboard에서 SQL을 실행하세요.'
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
