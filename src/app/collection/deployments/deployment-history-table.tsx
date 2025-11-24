'use client';

import React, { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/common/data-table';
import { StatusBadge, StatusType } from '@/components/common/status-badge';
import { TableActions, ActionButton } from '@/components/common/table-actions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// 스토리보드 UI-LM-CM-001: 배포 이력 관리
interface Deployment {
  id: string;
  deployedAt: string;
  agentName: string;
  task: string;
  status: StatusType;
  duration: string;
}

export function DeploymentHistoryTable() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [agents, setAgents] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(true);
  const [filterPeriod, setFilterPeriod] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const { mockAPI } = await import('@/lib/mock-data/collection');
      const [deploymentsData, agentsData] = await Promise.all([
        mockAPI.getDeployments(),
        mockAPI.getAgents()
      ]);

      // Create agent ID to name mapping
      const agentMap: {[key: string]: string} = {};
      agentsData.forEach((agent) => {
        agentMap[agent.id] = agent.name;
      });
      setAgents(agentMap);

      const transformedDeployments: Deployment[] = deploymentsData.map((dep) => ({
        id: dep.id,
        deployedAt: dep.timestamp,
        agentName: dep.agent_name,
        task: dep.action,
        status: dep.status as StatusType,
        duration: dep.duration
      }));
      setDeployments(transformedDeployments);
    } catch (error) {
      console.error('Failed to fetch deployments:', error);
    } finally {
      setLoading(false);
    }
  };


  const now = new Date();
  const filteredDeployments = deployments.filter((deployment) => {
    const deployedDate = new Date(deployment.deployedAt);
    const diffDays = Math.floor((now.getTime() - deployedDate.getTime()) / (1000 * 60 * 60 * 24));

    let matchesPeriod = true;
    if (filterPeriod === 'today') {
      matchesPeriod = diffDays === 0;
    } else if (filterPeriod === 'week') {
      matchesPeriod = diffDays <= 7;
    } else if (filterPeriod === 'month') {
      matchesPeriod = diffDays <= 30;
    }

    const matchesStatus = filterStatus === 'all' || deployment.status === filterStatus;
    return matchesPeriod && matchesStatus;
  });

  const successCount = filteredDeployments.filter(d => d.status === 'success').length;
  const failedCount = filteredDeployments.filter(d => d.status === 'failed').length;

  const columns: Column<Deployment>[] = [
    { header: '배포시각', accessor: 'deployedAt', className: 'font-medium' },
    { header: '에이전트', accessor: 'agentName' },
    { header: '작업', accessor: 'task', className: 'text-sm' },
    { header: '상태', accessor: (row) => <StatusBadge status={row.status} /> },
    { header: '소요시간', accessor: 'duration', className: 'text-muted-foreground' },
    {
      header: 'Action',
      accessor: (row) => {
        const actions: ActionButton[] = [
          { type: 'view' }
        ];

        if (row.status === 'failed') {
          actions.push({ type: 'retry' });
        }

        return <TableActions actions={actions} />;
      },
      className: 'text-right'
    }
  ];

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  return (
    <div className="space-y-4">
      {/* 필터 */}
      <div className="flex gap-4">
        <div className="w-[200px]">
          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="기간 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 기간</SelectItem>
              <SelectItem value="today">오늘</SelectItem>
              <SelectItem value="week">1주일</SelectItem>
              <SelectItem value="month">1개월</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[200px]">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="상태 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 상태</SelectItem>
              <SelectItem value="success">성공</SelectItem>
              <SelectItem value="failed">실패</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        data={filteredDeployments}
        columns={columns}
        title={`총 ${filteredDeployments.length}건 | 성공 ${successCount}건 | 실패 ${failedCount}건`}
        rowKey="id"
      />
    </div>
  );
}
