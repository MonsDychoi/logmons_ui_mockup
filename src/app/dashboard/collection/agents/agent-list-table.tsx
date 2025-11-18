'use client';

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

const mockAgents: Agent[] = [
  { id: '1', name: 'Log-01', serverIp: '10.0.0.1', status: 'normal', targetCount: 2, lastConnection: '1분 전' },
  { id: '2', name: 'Log-02', serverIp: '10.0.0.2', status: 'normal', targetCount: 1, lastConnection: '5분 전' },
  { id: '3', name: 'Log-03', serverIp: '10.0.0.1', status: 'disconnected', targetCount: 0, lastConnection: '-' },
  { id: '4', name: 'Log-04', serverIp: '10.0.0.2', status: 'disconnected', targetCount: 0, lastConnection: '-' },
  { id: '5', name: 'Log-05', serverIp: '10.0.0.3', status: 'error', targetCount: 1, lastConnection: '30분 전' }
];

export function AgentListTable() {
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
          { type: 'view', href: `/dashboard/collection/agents/${row.id}` },
          { type: 'restart', disabled: row.status === 'disconnected' },
          { type: 'stop', disabled: row.status === 'disconnected' },
          { type: 'delete' }
        ];
        return <TableActions actions={actions} />;
      },
      className: 'text-right'
    }
  ];

  return <DataTable data={mockAgents} columns={columns} title={`전체 에이전트(${mockAgents.length}개)`} rowKey="id" />;
}
