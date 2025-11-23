import { createClient } from '@/lib/supabase/server';
import type { Agent, Target, Channel, Deployment, AgentActivity } from '@/types/collection';
import { autoBackup } from './backup';

/**
 * 에이전트 관련 서비스
 */
export class AgentService {
  /**
   * 모든 에이전트 조회
   */
  static async getAll(): Promise<Agent[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * ID로 에이전트 조회
   */
  static async getById(id: string): Promise<Agent | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * 에이전트 생성
   */
  static async create(agent: Omit<Agent, 'id' | 'created_at' | 'updated_at'>): Promise<Agent> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('agents')
      .insert(agent)
      .select()
      .single();

    if (error) throw error;

    // 자동 백업
    await autoBackup();

    return data;
  }

  /**
   * 에이전트 업데이트
   */
  static async update(id: string, updates: Partial<Agent>): Promise<Agent> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('agents')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // 자동 백업
    await autoBackup();

    return data;
  }

  /**
   * 에이전트 삭제
   */
  static async delete(id: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // 자동 백업
    await autoBackup();
  }

  /**
   * 에이전트의 대상 목록 조회
   */
  static async getTargets(agentId: string): Promise<Target[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('targets')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * 에이전트의 활동 로그 조회
   */
  static async getActivities(agentId: string, limit: number = 10): Promise<AgentActivity[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('agent_activities')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}

/**
 * 채널 관련 서비스
 */
export class ChannelService {
  /**
   * 모든 채널 조회
   */
  static async getAll(): Promise<Channel[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * 채널 생성
   */
  static async create(channel: Omit<Channel, 'id' | 'created_at' | 'updated_at'>): Promise<Channel> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('channels')
      .insert(channel)
      .select()
      .single();

    if (error) throw error;

    // 자동 백업
    await autoBackup();

    return data;
  }

  /**
   * 채널 업데이트
   */
  static async update(id: string, updates: Partial<Channel>): Promise<Channel> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('channels')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // 자동 백업
    await autoBackup();

    return data;
  }

  /**
   * 채널 삭제
   */
  static async delete(id: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from('channels')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // 자동 백업
    await autoBackup();
  }

  /**
   * 상태별 채널 통계
   */
  static async getStats(): Promise<{ total: number; normal: number; warning: number; inactive: number }> {
    const channels = await this.getAll();

    return {
      total: channels.length,
      normal: channels.filter(c => c.status === 'normal').length,
      warning: channels.filter(c => c.status === 'warning').length,
      inactive: channels.filter(c => c.status === 'inactive').length
    };
  }
}

/**
 * 대상 관련 서비스
 */
export class TargetService {
  /**
   * 모든 대상 조회
   */
  static async getAll(): Promise<Target[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('targets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * 대상 생성
   */
  static async create(target: Omit<Target, 'id' | 'created_at' | 'updated_at'>): Promise<Target> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('targets')
      .insert(target)
      .select()
      .single();

    if (error) throw error;

    // 자동 백업
    await autoBackup();

    return data;
  }

  /**
   * 대상 업데이트
   */
  static async update(id: string, updates: Partial<Target>): Promise<Target> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('targets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // 자동 백업
    await autoBackup();

    return data;
  }

  /**
   * 대상 삭제
   */
  static async delete(id: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from('targets')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // 자동 백업
    await autoBackup();
  }
}
