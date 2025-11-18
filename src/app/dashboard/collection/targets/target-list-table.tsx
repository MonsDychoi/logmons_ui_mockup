'use client';

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

const mockAgentTargets: AgentTarget[] = [
  { id: '1', agentName: 'Log-01', serverIp: '10.0.0.1', totalTargets: 3, activeTargets: 2, status: 'normal', lastCollected: '1분 전' },
  { id: '2', agentName: 'Log-02', serverIp: '10.0.0.2', totalTargets: 2, activeTargets: 2, status: 'normal', lastCollected: '2분 전' },
  { id: '3', agentName: 'Log-03', serverIp: '10.0.0.1', totalTargets: 1, activeTargets: 0, status: 'disconnected', lastCollected: '-' },
  { id: '4', agentName: 'Log-04', serverIp: '10.0.0.2', totalTargets: 1, activeTargets: 0, status: 'disconnected', lastCollected: '-' },
  { id: '5', agentName: 'Log-05', serverIp: '10.0.0.3', totalTargets: 1, activeTargets: 1, status: 'error', lastCollected: '30분 전' }
];

export function TargetListTable() {
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
          { type: 'view', href: `/dashboard/collection/targets/${row.id}` },
          { type: 'edit' },
          { type: 'delete' }
        ];
        return <TableActions actions={actions} />;
      },
      className: 'text-right'
    }
  ];

  return <DataTable data={mockAgentTargets} columns={columns} title={`전체 수집 대상(${mockAgentTargets.length}개)`} rowKey="id" />;
}
