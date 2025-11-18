// Mock data for Logmons UI Template
// This file provides demo data for the dashboard without requiring authentication

export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  role: 'Admin'
};

export const mockProjects = [
  {
    id: '1',
    name: 'Production Database',
    status: 'active',
    region: 'us-east-1',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Staging Database',
    status: 'active',
    region: 'eu-west-1',
    createdAt: '2024-02-20'
  },
  {
    id: '3',
    name: 'Development Database',
    status: 'inactive',
    region: 'ap-southeast-1',
    createdAt: '2024-03-10'
  }
];

export const mockStats = {
  totalUsers: '2,543',
  activeProjects: '12',
  apiCalls: '1.2M',
  uptime: '99.9%',
  storage: '45.2 GB',
  bandwidth: '8.7 TB'
};

export const mockActivities = [
  {
    id: '1',
    user: 'Alice Johnson',
    action: 'Created new project',
    project: 'Analytics Dashboard',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    user: 'Bob Smith',
    action: 'Updated database schema',
    project: 'Production Database',
    timestamp: '5 hours ago'
  },
  {
    id: '3',
    user: 'Carol White',
    action: 'Deployed to staging',
    project: 'Staging Database',
    timestamp: '1 day ago'
  },
  {
    id: '4',
    user: 'David Brown',
    action: 'Added team member',
    project: 'Development Database',
    timestamp: '2 days ago'
  },
  {
    id: '5',
    user: 'Eve Davis',
    action: 'Configured API endpoint',
    project: 'Production Database',
    timestamp: '3 days ago'
  }
];

export const mockTeamMembers = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Developer',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'Designer',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob'
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol@example.com',
    role: 'Manager',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol'
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    role: 'Developer',
    status: 'Inactive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
  }
];
