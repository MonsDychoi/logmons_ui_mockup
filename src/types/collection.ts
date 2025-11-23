// 수집관리 타입 정의

export type StatusType = 'normal' | 'disconnected' | 'error' | 'warning' | 'inactive';

export interface Agent {
  id: string;
  name: string;
  server_ip: string;
  version?: string;
  install_path?: string;
  status: StatusType;
  collection_rate?: string;
  processed_events?: number;
  error_rate?: string;
  last_connection?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Target {
  id: string;
  agent_id: string;
  name: string;
  type?: string;
  status: StatusType;
  size?: string;
  last_collected?: string;
  collection_config?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface Channel {
  id: string;
  channel_name: string;
  topic_name: string;
  partitions: number;
  offset_value: number;
  status: StatusType;
  message_rate?: string;
  broker_config?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface Deployment {
  id: string;
  agent_id?: string;
  deployment_type: string;
  version?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  started_at?: string;
  completed_at?: string;
  error_message?: string;
  deployed_by?: string;
  deployment_config?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface AgentActivity {
  id: string;
  agent_id: string;
  action: string;
  result: 'success' | 'failed' | 'warning';
  details?: string;
  created_at: string;
}

// JSON 백업 형식
export interface CollectionBackup {
  version: string;
  exported_at: string;
  data: {
    agents: Agent[];
    targets: Target[];
    channels: Channel[];
    deployments: Deployment[];
    agent_activities: AgentActivity[];
  };
}
