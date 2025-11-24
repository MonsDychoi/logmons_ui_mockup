'use client';

import { useEffect, useState } from 'react';
import { DataTable, Column } from '@/components/common/data-table';
import { StatusBadge, StatusType } from '@/components/common/status-badge';
import { TableActions, ActionButton } from '@/components/common/table-actions';

interface Agent {
  id: string;
  name: string;
  serverIp: string;
  status: StatusType;
  targetCount: number;
  lastConnection: string;
}

export function AgentListTable() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);

      const { mockAPI } = await import('@/lib/mock-data/collection');
      const [agentsData, targetsData] = await Promise.all([
        mockAPI.getAgents(),
        mockAPI.getTargets()
      ]);

      // Count targets per agent
      const targetCountMap: { [key: string]: number } = {};
      targetsData.forEach((target) => {
        if (target.agent_id) {
          targetCountMap[target.agent_id] = (targetCountMap[target.agent_id] || 0) + 1;
        }
      });

      // Transform to UI format
      const transformedAgents: Agent[] = agentsData.map((agent) => ({
        id: agent.id,
        name: agent.name,
        serverIp: agent.server_ip,
        status: agent.status as StatusType,
        targetCount: targetCountMap[agent.id] || 0,
        lastConnection: agent.last_connected
      }));
      setAgents(transformedAgents);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<Agent>[] = [
    { header: '에이전트명', accessor: 'name', className: 'font-medium' },
    { header: '서버 IP', accessor: 'serverIp' },
    { header: '상태', accessor: (row) => <StatusBadge status={row.status} /> },
    { header: '대상', accessor: 'targetCount' },
    { header: '마지막 연결', accessor: 'lastConnection', className: 'text-muted-foreground' },
    {
      header: 'Action',
      accessor: (row) => {
        const actions: ActionButton[] = [
          { type: 'view', href: `/collection/agents/${row.id}` },
          { type: 'restart', disabled: row.status === 'disconnected' },
          { type: 'stop', disabled: row.status === 'disconnected' },
          { type: 'delete' }
        ];
        return <TableActions actions={actions} />;
      },
      className: 'text-right'
    }
  ];

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  return <DataTable data={agents} columns={columns} title={`전체 에이전트(${agents.length}개)`} rowKey="id" />;
}
