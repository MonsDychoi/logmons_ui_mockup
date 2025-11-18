'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { StatusBadge, StatusType } from '@/components/common/status-badge';
import { Activity, Database, AlertCircle, PlayCircle, Square, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';

// Mock data - 스토리보드 기반
const getAgentData = (id: string) => {
  const agents = {
    '1': {
      id: '1',
      name: 'Log-01',
      serverIp: '10.0.0.1',
      version: 'v2.4.1',
      installPath: '/opt/logmons/agent',
      status: 'normal' as StatusType,
      collectionRate: '98.5%',
      processedEvents: '1,234,567',
      errorRate: '0.2%',
      lastConnection: '1분 전',
      targets: [
        { id: 't1', name: '/var/log/application.log', status: 'normal' as StatusType, size: '2.3GB' },
        { id: 't2', name: '/var/log/system.log', status: 'normal' as StatusType, size: '1.1GB' },
        { id: 't3', name: '/var/log/error.log', status: 'warning' as StatusType, size: '245MB' }
      ],
      recentActivities: [
        { time: '2025-11-17 14:30:22', action: '수집 시작', result: '성공', details: 'application.log' },
        { time: '2025-11-17 14:25:15', action: '설정 업데이트', result: '성공', details: '수집 주기 변경' },
        { time: '2025-11-17 14:20:10', action: '재시작', result: '성공', details: '시스템 재시작' }
      ]
    },
    '2': {
      id: '2',
      name: 'Log-02',
      serverIp: '10.0.0.2',
      version: 'v2.4.1',
      installPath: '/opt/logmons/agent',
      status: 'normal' as StatusType,
      collectionRate: '99.1%',
      processedEvents: '987,654',
      errorRate: '0.1%',
      lastConnection: '5분 전',
      targets: [
        { id: 't4', name: '/var/log/nginx/access.log', status: 'normal' as StatusType, size: '5.2GB' }
      ],
      recentActivities: [
        { time: '2025-11-17 14:28:45', action: '수집 시작', result: '성공', details: 'nginx/access.log' }
      ]
    },
    '3': {
      id: '3',
      name: 'Log-03',
      serverIp: '10.0.0.1',
      version: 'v2.4.0',
      installPath: '/opt/logmons/agent',
      status: 'disconnected' as StatusType,
      collectionRate: '-',
      processedEvents: '-',
      errorRate: '-',
      lastConnection: '-',
      targets: [],
      recentActivities: []
    },
    '5': {
      id: '5',
      name: 'Log-05',
      serverIp: '10.0.0.3',
      version: 'v2.3.8',
      installPath: '/opt/logmons/agent',
      status: 'error' as StatusType,
      collectionRate: '45.2%',
      processedEvents: '234,567',
      errorRate: '12.5%',
      lastConnection: '30분 전',
      targets: [
        { id: 't5', name: '/var/log/database.log', status: 'error' as StatusType, size: '3.8GB' }
      ],
      recentActivities: [
        { time: '2025-11-17 14:00:30', action: '수집 시작', result: '실패', details: 'Connection timeout' },
        { time: '2025-11-17 13:55:22', action: '재시작', result: '성공', details: '시스템 재시작' }
      ]
    }
  };

  return agents[id as keyof typeof agents] || agents['1'];
};

export function AgentDetailView({ agentId }: { agentId: string }) {
  const agent = getAgentData(agentId);

  return (
    <div className="space-y-4">
      {/* Status Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">수집율</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agent.collectionRate}</div>
            <p className="text-xs text-muted-foreground">최근 24시간 기준</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">처리된 이벤트</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agent.processedEvents}</div>
            <p className="text-xs text-muted-foreground">전체 누적</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">오류율</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agent.errorRate}</div>
            <p className="text-xs text-muted-foreground">최근 24시간 기준</p>
          </CardContent>
        </Card>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">에이전트명</span>
                <span className="text-sm font-medium">{agent.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">서버 IP</span>
                <span className="text-sm font-medium">{agent.serverIp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">상태</span>
                <StatusBadge status={agent.status} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">버전</span>
                <span className="text-sm font-medium">{agent.version}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">설치 경로</span>
                <span className="text-sm font-medium">{agent.installPath}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">마지막 연결</span>
                <span className="text-sm font-medium">{agent.lastConnection}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <Button
              variant="default"
              size="sm"
              disabled={agent.status === 'disconnected'}
              className="bg-[#3ecf8e] hover:bg-[#3ecf8e]/90"
            >
              <PlayCircle className="h-4 w-4 mr-1" />
              재시작
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={agent.status === 'disconnected'}
            >
              <Square className="h-4 w-4 mr-1" />
              정지
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              수정
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-1 text-destructive" />
              삭제
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Collection Targets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>수집 대상 ({agent.targets.length}개)</CardTitle>
            <Link href={`/dashboard/collection/targets?agent=${agent.id}`}>
              <Button variant="outline" size="sm">
                대상 관리
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {agent.targets.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>대상명</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="text-right">크기</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agent.targets.map((target) => (
                  <TableRow key={target.id}>
                    <TableCell className="font-medium">{target.name}</TableCell>
                    <TableCell><StatusBadge status={target.status} /></TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {target.size}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground">
                등록된 수집 대상이 없습니다
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>최근 작업 이력</CardTitle>
        </CardHeader>
        <CardContent>
          {agent.recentActivities.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>시간</TableHead>
                  <TableHead>작업</TableHead>
                  <TableHead>결과</TableHead>
                  <TableHead>상세</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agent.recentActivities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{activity.time}</TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          activity.result === '성공' ? 'default' : 'destructive'
                        }
                        className={
                          activity.result === '성공'
                            ? 'bg-[#3ecf8e]/10 text-[#3ecf8e] hover:bg-[#3ecf8e]/20'
                            : ''
                        }
                      >
                        {activity.result}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {activity.details}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground">
                최근 작업 이력이 없습니다
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
