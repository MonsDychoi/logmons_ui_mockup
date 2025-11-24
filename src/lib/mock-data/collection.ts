// Mock data for collection management features

export interface Agent {
  id: string;
  name: string;
  server_ip: string;
  status: 'normal' | 'disconnected' | 'error';
  version: string;
  install_path: string;
  last_connected: string;
  target_count: number;
}

export interface Target {
  id: string;
  agent_id: string;
  name: string;
  type: 'file' | 'syslog' | 'tcp-udp';
  status: 'normal' | 'disconnected' | 'error';
  collection_rate: string;
  last_collected: string;
  channel_name: string;
  collection_config: any;
}

export interface Channel {
  id: string;
  name: string;
  target_count: number;
  status: 'normal' | 'warning' | 'inactive';
}

export interface Deployment {
  id: string;
  timestamp: string;
  agent_name: string;
  action: string;
  status: 'success' | 'failed';
  duration: string;
}

// Mock Agents
export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'web-01',
    server_ip: '10.0.1.10',
    status: 'normal',
    version: '8.13.0',
    install_path: '/opt/logmons/filebeat',
    last_connected: '1분 전',
    target_count: 3
  },
  {
    id: '2',
    name: 'web-02',
    server_ip: '10.0.1.11',
    status: 'normal',
    version: '8.13.0',
    install_path: '/opt/logmons/filebeat',
    last_connected: '5분 전',
    target_count: 1
  },
  {
    id: '3',
    name: 'web-03',
    server_ip: '10.0.1.12',
    status: 'disconnected',
    version: '8.13.0',
    install_path: '/opt/logmons/filebeat',
    last_connected: '-',
    target_count: 0
  },
  {
    id: '4',
    name: 'app-01',
    server_ip: '10.0.2.10',
    status: 'disconnected',
    version: '8.13.0',
    install_path: '/opt/logmons/filebeat',
    last_connected: '-',
    target_count: 0
  },
  {
    id: '5',
    name: 'db-01',
    server_ip: '10.0.3.10',
    status: 'error',
    version: '8.13.0',
    install_path: '/opt/logmons/filebeat',
    last_connected: '30분 전',
    target_count: 1
  }
];

// Mock Targets
export const mockTargets: Target[] = [
  {
    id: '1',
    agent_id: '1',
    name: 'nginx-access-logs',
    type: 'file',
    status: 'normal',
    collection_rate: '100/s',
    last_collected: '1분 전',
    channel_name: 'nginx-logs',
    collection_config: {
      input_type: 'file',
      paths: ['/var/log/nginx/access.log'],
      encoding: 'UTF-8',
      enable_multiline: false,
      parsing_method: 'json'
    }
  },
  {
    id: '2',
    agent_id: '1',
    name: 'nginx-error-logs',
    type: 'file',
    status: 'normal',
    collection_rate: '10/s',
    last_collected: '2분 전',
    channel_name: 'error-logs',
    collection_config: {
      input_type: 'file',
      paths: ['/var/log/nginx/error.log'],
      encoding: 'UTF-8',
      enable_multiline: true,
      multiline_pattern: '^\\d{4}',
      multiline_negate: true,
      multiline_match: 'after',
      parsing_method: 'none'
    }
  },
  {
    id: '3',
    agent_id: '1',
    name: 'app-logs',
    type: 'file',
    status: 'normal',
    collection_rate: '50/s',
    last_collected: '1분 전',
    channel_name: 'app-logs',
    collection_config: {
      input_type: 'file',
      paths: ['/var/log/app/*.log'],
      encoding: 'UTF-8',
      enable_multiline: false,
      parsing_method: 'json'
    }
  },
  {
    id: '4',
    agent_id: '2',
    name: 'syslog-receiver',
    type: 'syslog',
    status: 'normal',
    collection_rate: '200/s',
    last_collected: '5분 전',
    channel_name: 'syslog',
    collection_config: {
      input_type: 'syslog',
      protocol: 'udp',
      listen_ip: '0.0.0.0',
      listen_port: '514',
      syslog_format: 'auto',
      parsing_method: 'none'
    }
  },
  {
    id: '5',
    agent_id: '5',
    name: 'database-logs',
    type: 'file',
    status: 'error',
    collection_rate: '0',
    last_collected: '30분 전',
    channel_name: 'db-logs',
    collection_config: {
      input_type: 'file',
      paths: ['/var/log/postgresql/*.log'],
      encoding: 'UTF-8',
      enable_multiline: true,
      multiline_pattern: '^\\d{4}-\\d{2}-\\d{2}',
      multiline_negate: true,
      multiline_match: 'after',
      parsing_method: 'none'
    }
  }
];

// Mock Channels
export const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'nginx-logs',
    target_count: 1,
    status: 'normal'
  },
  {
    id: '2',
    name: 'error-logs',
    target_count: 3,
    status: 'normal'
  },
  {
    id: '3',
    name: 'app-logs',
    target_count: 2,
    status: 'warning'
  },
  {
    id: '4',
    name: 'syslog',
    target_count: 1,
    status: 'normal'
  },
  {
    id: '5',
    name: 'db-logs',
    target_count: 0,
    status: 'inactive'
  }
];

// Mock Deployments
export const mockDeployments: Deployment[] = [
  {
    id: '1',
    timestamp: '2025-11-10 10:00',
    agent_name: 'web-01',
    action: '배포',
    status: 'success',
    duration: '100s'
  },
  {
    id: '2',
    timestamp: '2025-11-10 10:05',
    agent_name: 'web-02',
    action: '배포',
    status: 'success',
    duration: '95s'
  },
  {
    id: '3',
    timestamp: '2025-11-10 10:10',
    agent_name: 'app-01',
    action: '배포',
    status: 'failed',
    duration: '30s'
  },
  {
    id: '4',
    timestamp: '2025-11-10 10:15',
    agent_name: 'db-01',
    action: '재시작',
    status: 'success',
    duration: '45s'
  }
];

// Helper functions to simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAPI = {
  // Agents
  async getAgents(): Promise<Agent[]> {
    await delay(300);
    return mockAgents;
  },

  async getAgent(id: string): Promise<Agent | undefined> {
    await delay(200);
    return mockAgents.find(a => a.id === id);
  },

  async createAgent(agent: Omit<Agent, 'id'>): Promise<Agent> {
    await delay(500);
    const newAgent: Agent = {
      ...agent,
      id: String(mockAgents.length + 1)
    };
    mockAgents.push(newAgent);
    return newAgent;
  },

  // Targets
  async getTargets(): Promise<Target[]> {
    await delay(300);
    return mockTargets;
  },

  async getTargetsByAgent(agentId: string): Promise<Target[]> {
    await delay(200);
    return mockTargets.filter(t => t.agent_id === agentId);
  },

  async getTarget(id: string): Promise<Target | undefined> {
    await delay(200);
    return mockTargets.find(t => t.id === id);
  },

  async createTarget(target: Omit<Target, 'id'>): Promise<Target> {
    await delay(500);
    const newTarget: Target = {
      ...target,
      id: String(mockTargets.length + 1),
      status: 'normal',
      collection_rate: '0',
      last_collected: '-'
    };
    mockTargets.push(newTarget);
    return newTarget;
  },

  // Channels
  async getChannels(): Promise<Channel[]> {
    await delay(300);
    return mockChannels;
  },

  // Deployments
  async getDeployments(): Promise<Deployment[]> {
    await delay(300);
    return mockDeployments;
  }
};
