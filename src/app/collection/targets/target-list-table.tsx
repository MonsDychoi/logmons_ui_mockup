'use client';

import { useEffect, useState } from 'react';
import { DataTable, Column } from '@/components/common/data-table';
import { StatusBadge, StatusType } from '@/components/common/status-badge';
import { TableActions, ActionButton } from '@/components/common/table-actions';

// 스토리보드 UI-LM-CO-001: 에이전트별로 그룹핑된 수집 대상 목록
interface AgentTarget {
  id: string;
  agentName: string;
  serverIp: string;
  totalTargets: number;
  activeTargets: number;
  status: StatusType;
  lastCollected: string;
}

export function TargetListTable() {
  const [agentTargets, setAgentTargets] = useState<AgentTarget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgentTargets();
  }, []);

  const fetchAgentTargets = async () => {
    try {
      setLoading(true);

      // Fetch agents and targets data
      const [agentsRes, targetsRes] = await Promise.all([
        fetch('/api/collection/agents'),
        fetch('/api/collection/targets')
      ]);

      const agentsResult = await agentsRes.json();
      const targetsResult = await targetsRes.json();

      if (agentsResult.success && targetsResult.success) {
        const agents = agentsResult.data || [];
        const targets = targetsResult.data || [];

        console.log('Agents data:', agents);
        console.log('Targets data:', targets);

        // Group targets by agent
        const agentTargetsMap: { [key: string]: AgentTarget } = {};

        agents.forEach((agent: any) => {
          agentTargetsMap[agent.id] = {
            id: agent.id,
            agentName: agent.name,
            serverIp: agent.server_ip,
            totalTargets: 0,
            activeTargets: 0,
            status: agent.status as StatusType,
            lastCollected: '-'
          };
        });

        // Count targets per agent
        targets.forEach((target: any) => {
          if (target.agent_id && agentTargetsMap[target.agent_id]) {
            agentTargetsMap[target.agent_id].totalTargets++;
            if (target.status === 'normal') {
              agentTargetsMap[target.agent_id].activeTargets++;
            }

            // Update last collected time
            if (target.last_collected) {
              const currentLastCollected = agentTargetsMap[target.agent_id].lastCollected;
              if (currentLastCollected === '-' ||
                  new Date(target.last_collected) > new Date(currentLastCollected)) {
                agentTargetsMap[target.agent_id].lastCollected = formatTimeAgo(new Date(target.last_collected));
              }
            }
          }
        });

        setAgentTargets(Object.values(agentTargetsMap));
      }
    } catch (error) {
      console.error('Failed to fetch agent targets:', error);
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
  const columns: Column<AgentTarget>[] = [
    { header: '에이전트명', accessor: 'agentName', className: 'font-medium' },
    { header: '서버 IP', accessor: 'serverIp' },
    {
      header: '수집 대상',
      accessor: (row) => `${row.totalTargets}개`,
      className: 'text-center'
    },
    {
      header: '수집 중인 대상',
      accessor: (row) => `${row.activeTargets}개`,
      className: 'text-center'
    },
    { header: '상태', accessor: (row) => <StatusBadge status={row.status} /> },
    { header: '마지막 수집', accessor: 'lastCollected', className: 'text-muted-foreground' },
    {
      header: 'Action',
      accessor: (row) => {
        const actions: ActionButton[] = [
          { type: 'view', href: `/collection/targets/${row.id}` }
        ];
        return <TableActions actions={actions} />;
      },
      className: 'text-right'
    }
  ];

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  return <DataTable data={agentTargets} columns={columns} title={`전체 수집 대상(${agentTargets.length}개)`} rowKey="id" />;
}
