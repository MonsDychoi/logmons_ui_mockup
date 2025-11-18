'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import { Search, Database } from 'lucide-react';

// 스토리보드 UI-LM-CN-001: Kafka 채널 관리
interface KafkaChannel {
  id: string;
  channelName: string;
  topicName: string;
  partitions: number;
  offset: string;
  status: StatusType;
  messageRate: string;
}

const mockChannels: KafkaChannel[] = [
  { id: '1', channelName: 'log-collection-01', topicName: 'logs.application', partitions: 3, offset: '1,234,567', status: 'normal', messageRate: '1.2K msg/s' },
  { id: '2', channelName: 'log-collection-02', topicName: 'logs.system', partitions: 3, offset: '987,654', status: 'normal', messageRate: '850 msg/s' },
  { id: '3', channelName: 'log-collection-03', topicName: 'logs.error', partitions: 2, offset: '456,789', status: 'normal', messageRate: '320 msg/s' },
  { id: '4', channelName: 'log-collection-04', topicName: 'logs.nginx', partitions: 4, offset: '2,345,678', status: 'normal', messageRate: '1.8K msg/s' },
  { id: '5', channelName: 'log-collection-05', topicName: 'logs.database', partitions: 2, offset: '654,321', status: 'warning', messageRate: '180 msg/s' },
  { id: '6', channelName: 'log-collection-06', topicName: 'logs.audit', partitions: 1, offset: '123,456', status: 'normal', messageRate: '95 msg/s' },
  { id: '7', channelName: 'log-collection-07', topicName: 'logs.security', partitions: 2, offset: '789,012', status: 'normal', messageRate: '420 msg/s' },
  { id: '8', channelName: 'log-collection-08', topicName: 'logs.analytics', partitions: 3, offset: '345,678', status: 'inactive', messageRate: '-' },
  { id: '9', channelName: 'log-collection-09', topicName: 'logs.monitoring', partitions: 2, offset: '567,890', status: 'inactive', messageRate: '-' },
  { id: '10', channelName: 'log-collection-10', topicName: 'logs.backup', partitions: 1, offset: '234,567', status: 'normal', messageRate: '65 msg/s' }
];

export function ChannelListTable() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredChannels = mockChannels.filter((channel) => {
    const matchesStatus = filterStatus === 'all' || channel.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      channel.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.topicName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const normalCount = mockChannels.filter(c => c.status === 'normal').length;
  const warningCount = mockChannels.filter(c => c.status === 'warning').length;
  const inactiveCount = mockChannels.filter(c => c.status === 'inactive').length;

  const columns: Column<KafkaChannel>[] = [
    { header: '채널명', accessor: 'channelName', className: 'font-medium' },
    { header: '토픽명', accessor: 'topicName', className: 'text-sm' },
    { header: '파티션', accessor: (row) => `${row.partitions}개`, className: 'text-center' },
    { header: '오프셋', accessor: 'offset' },
    { header: '상태', accessor: (row) => <StatusBadge status={row.status} /> },
    { header: '메시지 수신률', accessor: 'messageRate', className: 'text-muted-foreground' },
    {
      header: 'Action',
      accessor: (row) => {
        const actions: ActionButton[] = [
          { type: 'view', href: `/dashboard/collection/channels/${row.id}` },
          { type: 'edit' },
          { type: 'delete' }
        ];
        return <TableActions actions={actions} />;
      },
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Kafka 클러스터 정보 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">브로커</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3개</div>
            <p className="text-xs text-muted-foreground">정상 작동 중</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 토픽</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockChannels.length}개</div>
            <p className="text-xs text-muted-foreground">등록된 토픽</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">정상 토픽</CardTitle>
            <Database className="h-4 w-4 text-[#3ecf8e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#3ecf8e]">{normalCount}개</div>
            <p className="text-xs text-muted-foreground">정상 작동</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">경고</CardTitle>
            <Database className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{warningCount}개</div>
            <p className="text-xs text-muted-foreground">지연 발생</p>
          </CardContent>
        </Card>
      </div>

      {/* 필터 및 검색 */}
      <div className="flex gap-4">
        <div className="w-[200px]">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="상태 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 상태</SelectItem>
              <SelectItem value="normal">정상</SelectItem>
              <SelectItem value="warning">경고</SelectItem>
              <SelectItem value="inactive">대기</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="채널명 또는 토픽명 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* 채널 테이블 */}
      <DataTable
        data={filteredChannels}
        columns={columns}
        title={`총 ${mockChannels.length}개 채널 | 정상 ${normalCount}개 | 지연 ${warningCount}개 | 대기 ${inactiveCount}개`}
        rowKey="id"
      />
    </div>
  );
}
