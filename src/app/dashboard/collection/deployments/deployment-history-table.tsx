'use client';

import React, { useState } from 'react';
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

const mockDeployments: Deployment[] = [
  { id: '1', deployedAt: '2025-11-17 14:30:22', agentName: 'Log-01', task: '에이전트 업데이트 (v2.4.1)', status: 'success', duration: '2분 15초' },
  { id: '2', deployedAt: '2025-11-17 14:25:10', agentName: 'Log-02', task: '설정 변경 (수집 주기)', status: 'success', duration: '45초' },
  { id: '3', deployedAt: '2025-11-17 14:20:33', agentName: 'Log-03', task: '에이전트 업데이트 (v2.4.1)', status: 'failed', duration: '5분 12초' },
  { id: '4', deployedAt: '2025-11-17 14:15:00', agentName: 'Log-01', task: '설정 변경 (로그 레벨)', status: 'success', duration: '30초' },
  { id: '5', deployedAt: '2025-11-17 14:10:22', agentName: 'Log-04', task: '에이전트 재시작', status: 'success', duration: '1분 20초' },
  { id: '6', deployedAt: '2025-11-17 13:45:15', agentName: 'Log-05', task: '롤백 (v2.3.8)', status: 'success', duration: '1분 50초' },
  { id: '7', deployedAt: '2025-11-17 13:30:00', agentName: 'Log-02', task: '에이전트 업데이트 (v2.4.1)', status: 'success', duration: '2분 30초' },
  { id: '8', deployedAt: '2025-11-17 12:20:45', agentName: 'Log-01', task: '설정 변경 (파일 경로)', status: 'success', duration: '40초' },
  { id: '9', deployedAt: '2025-11-17 11:15:30', agentName: 'Log-03', task: '에이전트 재시작', status: 'failed', duration: '3분 10초' },
  { id: '10', deployedAt: '2025-11-17 10:30:00', agentName: 'Log-04', task: '설정 변경 (버퍼 크기)', status: 'success', duration: '35초' },
  { id: '11', deployedAt: '2025-11-16 16:45:22', agentName: 'Log-05', task: '에이전트 업데이트 (v2.4.0)', status: 'success', duration: '2분 45초' },
  { id: '12', deployedAt: '2025-11-16 15:30:10', agentName: 'Log-01', task: '설정 변경 (압축 옵션)', status: 'success', duration: '50초' },
  { id: '13', deployedAt: '2025-11-16 14:20:00', agentName: 'Log-02', task: '에이전트 재시작', status: 'success', duration: '1분 15초' },
  { id: '14', deployedAt: '2025-11-16 13:10:45', agentName: 'Log-03', task: '설정 변경 (타임아웃)', status: 'success', duration: '42초' },
  { id: '15', deployedAt: '2025-11-16 11:00:30', agentName: 'Log-04', task: '에이전트 업데이트 (v2.4.0)', status: 'failed', duration: '4분 20초' },
  { id: '16', deployedAt: '2025-11-15 16:30:00', agentName: 'Log-01', task: '설정 변경 (재시도 정책)', status: 'success', duration: '38초' },
  { id: '17', deployedAt: '2025-11-15 14:45:15', agentName: 'Log-02', task: '에이전트 재시작', status: 'success', duration: '1분 10초' },
  { id: '18', deployedAt: '2025-11-15 12:20:40', agentName: 'Log-05', task: '설정 변경 (메모리 제한)', status: 'success', duration: '45초' },
  { id: '19', deployedAt: '2025-11-15 10:15:25', agentName: 'Log-03', task: '에이전트 업데이트 (v2.3.9)', status: 'success', duration: '2분 20초' },
  { id: '20', deployedAt: '2025-11-15 09:00:00', agentName: 'Log-04', task: '설정 변경 (인코딩)', status: 'success', duration: '35초' },
  { id: '21', deployedAt: '2025-11-10 15:30:22', agentName: 'Log-01', task: '에이전트 업데이트 (v2.3.8)', status: 'success', duration: '2분 35초' },
  { id: '22', deployedAt: '2025-11-10 14:20:10', agentName: 'Log-02', task: '설정 변경 (필터 규칙)', status: 'success', duration: '48초' },
  { id: '23', deployedAt: '2025-11-10 13:15:00', agentName: 'Log-05', task: '에이전트 재시작', status: 'success', duration: '1분 25초' },
  { id: '24', deployedAt: '2025-11-10 11:00:45', agentName: 'Log-03', task: '설정 변경 (샘플링률)', status: 'success', duration: '40초' },
  { id: '25', deployedAt: '2025-11-10 09:30:30', agentName: 'Log-04', task: '에이전트 업데이트 (v2.3.8)', status: 'success', duration: '2분 40초' },
  { id: '26', deployedAt: '2025-10-20 16:45:00', agentName: 'Log-01', task: '설정 변경 (캐시 설정)', status: 'success', duration: '42초' },
  { id: '27', deployedAt: '2025-10-20 15:30:15', agentName: 'Log-02', task: '에이전트 재시작', status: 'success', duration: '1분 18초' },
  { id: '28', deployedAt: '2025-10-20 14:20:40', agentName: 'Log-03', task: '설정 변경 (배치 크기)', status: 'success', duration: '46초' },
  { id: '29', deployedAt: '2025-10-20 12:10:25', agentName: 'Log-05', task: '에이전트 업데이트 (v2.3.7)', status: 'success', duration: '2분 25초' },
  { id: '30', deployedAt: '2025-10-20 10:00:00', agentName: 'Log-04', task: '설정 변경 (연결 풀)', status: 'success', duration: '38초' }
];

export function DeploymentHistoryTable() {
  const [filterPeriod, setFilterPeriod] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const now = new Date('2025-11-17T14:35:00'); // 현재 시각
  const filteredDeployments = mockDeployments.filter((deployment) => {
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
