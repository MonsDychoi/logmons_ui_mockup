import { createClient } from '@/lib/supabase/server';
import type { CollectionBackup, Agent, Target, Channel, Deployment, AgentActivity } from '@/types/collection';
import fs from 'fs/promises';
import path from 'path';

/**
 * Supabase에서 모든 수집관리 데이터를 가져와서 JSON 파일로 백업
 */
export async function backupToJSON(backupPath?: string): Promise<string> {
  const supabase = await createClient();

  // 모든 테이블에서 데이터 조회
  const [agentsRes, targetsRes, channelsRes, deploymentsRes, activitiesRes] = await Promise.all([
    supabase.from('agents').select('*').order('created_at'),
    supabase.from('targets').select('*').order('created_at'),
    supabase.from('channels').select('*').order('created_at'),
    supabase.from('deployments').select('*').order('created_at'),
    supabase.from('agent_activities').select('*').order('created_at')
  ]);

  const backup: CollectionBackup = {
    version: '1.0.0',
    exported_at: new Date().toISOString(),
    data: {
      agents: agentsRes.data || [],
      targets: targetsRes.data || [],
      channels: channelsRes.data || [],
      deployments: deploymentsRes.data || [],
      agent_activities: activitiesRes.data || []
    }
  };

  // JSON 파일로 저장
  const defaultPath = path.join(process.cwd(), 'data', 'backups');
  const finalPath = backupPath || defaultPath;

  await fs.mkdir(finalPath, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  const filename = `collection-backup-${timestamp}.json`;
  const filepath = path.join(finalPath, filename);

  await fs.writeFile(filepath, JSON.stringify(backup, null, 2), 'utf-8');

  // 최신 백업으로도 저장
  const latestPath = path.join(finalPath, 'collection-latest.json');
  await fs.writeFile(latestPath, JSON.stringify(backup, null, 2), 'utf-8');

  return filepath;
}

/**
 * JSON 파일에서 데이터를 읽어와서 Supabase에 복원
 */
export async function restoreFromJSON(backupPath: string): Promise<void> {
  const supabase = await createClient();

  // JSON 파일 읽기
  const data = await fs.readFile(backupPath, 'utf-8');
  const backup: CollectionBackup = JSON.parse(data);

  // 기존 데이터 삭제 (선택사항 - 위험할 수 있음)
  // await Promise.all([
  //   supabase.from('agent_activities').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
  //   supabase.from('deployments').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
  //   supabase.from('targets').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
  //   supabase.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
  //   supabase.from('agents').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  // ]);

  // 데이터 복원 (upsert 사용)
  const results = await Promise.all([
    supabase.from('agents').upsert(backup.data.agents),
    supabase.from('targets').upsert(backup.data.targets),
    supabase.from('channels').upsert(backup.data.channels),
    supabase.from('deployments').upsert(backup.data.deployments),
    supabase.from('agent_activities').upsert(backup.data.agent_activities)
  ]);

  // 에러 확인
  const errors = results.filter(r => r.error);
  if (errors.length > 0) {
    throw new Error(`복원 중 에러 발생: ${errors.map(e => e.error?.message).join(', ')}`);
  }
}

/**
 * 자동 백업 - 데이터 변경 시마다 호출
 */
export async function autoBackup(): Promise<void> {
  try {
    await backupToJSON();
    console.log('자동 백업 완료');
  } catch (error) {
    console.error('자동 백업 실패:', error);
  }
}

/**
 * JSON 파일 직접 읽기
 */
export async function readBackupFile(filename: string = 'collection-latest.json'): Promise<CollectionBackup | null> {
  try {
    const filepath = path.join(process.cwd(), 'data', 'backups', filename);
    const data = await fs.readFile(filepath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

/**
 * 브라우저에서 다운로드 가능한 JSON 생성
 */
export async function generateBackupJSON(): Promise<CollectionBackup> {
  const supabase = await createClient();

  const [agentsRes, targetsRes, channelsRes, deploymentsRes, activitiesRes] = await Promise.all([
    supabase.from('agents').select('*').order('created_at'),
    supabase.from('targets').select('*').order('created_at'),
    supabase.from('channels').select('*').order('created_at'),
    supabase.from('deployments').select('*').order('created_at'),
    supabase.from('agent_activities').select('*').order('created_at')
  ]);

  return {
    version: '1.0.0',
    exported_at: new Date().toISOString(),
    data: {
      agents: agentsRes.data || [],
      targets: targetsRes.data || [],
      channels: channelsRes.data || [],
      deployments: deploymentsRes.data || [],
      agent_activities: activitiesRes.data || []
    }
  };
}
