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

      // Fetch both agents and targets in parallel
      const [agentsRes, targetsRes] = await Promise.all([
        fetch('/api/collection/agents'),
        fetch('/api/collection/targets')
      ]);

      const agentsResult = await agentsRes.json();
      const targetsResult = await targetsRes.json();

      if (agentsResult.success && agentsResult.data) {
        const agents = agentsResult.data;
        const targets = targetsResult.success ? targetsResult.data || [] : [];

        // Count targets per agent
        const targetCountMap: { [key: string]: number } = {};
        targets.forEach((target: any) => {
          if (target.agent_id) {
            targetCountMap[target.agent_id] = (targetCountMap[target.agent_id] || 0) + 1;
          }
        });

        // Transform database data to UI format
        const transformedAgents: Agent[] = agents.map((agent: any) => ({
          id: agent.id,
          name: agent.name,
          serverIp: agent.server_ip,
          status: agent.status as StatusType,
          targetCount: targetCountMap[agent.id] || 0,
          lastConnection: agent.last_connection
            ? formatTimeAgo(new Date(agent.last_connection))
            : '-'
        }));
        setAgents(transformedAgents);
      }
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}시간 전`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}일 전`;
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
