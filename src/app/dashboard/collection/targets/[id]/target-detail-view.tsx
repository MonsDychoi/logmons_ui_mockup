'use client';

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
import { TypeBadge } from '@/components/common/type-badge';
import { Rocket, Settings, Edit, Trash2 } from 'lucide-react';

// 스토리보드 UI-LM-CO-002: 수집 대상 상세 페이지
interface CollectionConfig {
  id: string;
  name: string;
  type: string;
  path: string;
  status: StatusType;
  size: string;
}

interface TargetDetail {
  id: string;
  agentName: string;
  serverIp: string;
  status: StatusType;
  version: string;
  installPath: string;
  lastCollected: string;
  configs: CollectionConfig[];
}

const getTargetData = (id: string): TargetDetail => {
  const targets: Record<string, TargetDetail> = {
    '1': {
      id: '1',
      agentName: 'Log-01',
      serverIp: '10.0.0.1',
      status: 'normal' as StatusType,
      version: 'v2.4.1',
      installPath: '/opt/logmons/agent',
      lastCollected: '1분 전',
      configs: [
        { id: 'c1', name: 'Application Log', type: 'File', path: '/var/log/application.log', status: 'normal' as StatusType, size: '2.3GB' },
        { id: 'c2', name: 'System Log', type: 'File', path: '/var/log/system.log', status: 'normal' as StatusType, size: '1.1GB' },
        { id: 'c3', name: 'Error Log', type: 'File', path: '/var/log/error.log', status: 'warning' as StatusType, size: '245MB' }
      ]
    },
    '2': {
      id: '2',
      agentName: 'Log-02',
      serverIp: '10.0.0.2',
      status: 'normal' as StatusType,
      version: 'v2.4.1',
      installPath: '/opt/logmons/agent',
      lastCollected: '2분 전',
      configs: [
        { id: 'c4', name: 'Nginx Access Log', type: 'File', path: '/var/log/nginx/access.log', status: 'normal' as StatusType, size: '5.2GB' },
        { id: 'c5', name: 'MySQL Audit Logs', type: 'Database', path: 'mysql://audit', status: 'normal' as StatusType, size: '890MB' }
      ]
    },
    '3': {
      id: '3',
      agentName: 'Log-03',
      serverIp: '10.0.0.1',
      status: 'disconnected' as StatusType,
      version: 'v2.4.0',
      installPath: '/opt/logmons/agent',
      lastCollected: '-',
      configs: []
    },
    '5': {
      id: '5',
      agentName: 'Log-05',
      serverIp: '10.0.0.3',
      status: 'error' as StatusType,
      version: 'v2.3.8',
      installPath: '/opt/logmons/agent',
      lastCollected: '30분 전',
      configs: [
        { id: 'c6', name: 'Database Log', type: 'File', path: '/var/log/database.log', status: 'error' as StatusType, size: '3.8GB' }
      ]
    }
  };

  return targets[id] || targets['1'];
};

export function TargetDetailView({ targetId }: { targetId: string }) {
  const target = getTargetData(targetId);

  return (
    <div className="space-y-4">
      {/* 기본 정보 with 배포 버튼 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>기본 정보</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                disabled={target.status === 'disconnected'}
                className="bg-[#3ecf8e] hover:bg-[#3ecf8e]/90"
              >
                <Rocket className="h-4 w-4 mr-1" />
                배포
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={target.status === 'disconnected'}
              >
                <Settings className="h-4 w-4 mr-1" />
                설정
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">에이전트명</span>
                <span className="text-sm font-medium">{target.agentName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">서버 IP</span>
                <span className="text-sm font-medium">{target.serverIp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">상태</span>
                <StatusBadge status={target.status} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">배포 버전</span>
                <span className="text-sm font-medium">{target.version}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">설치 경로</span>
                <span className="text-sm font-medium">{target.installPath}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">마지막 수집</span>
                <span className="text-sm font-medium">{target.lastCollected}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
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

      {/* 수집 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>수집 설정 ({target.configs.length}개)</CardTitle>
        </CardHeader>
        <CardContent>
          {target.configs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>대상명</TableHead>
                  <TableHead>유형</TableHead>
                  <TableHead>경로</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="text-right">크기</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {target.configs.map((config) => (
                  <TableRow key={config.id}>
                    <TableCell className="font-medium">{config.name}</TableCell>
                    <TableCell><TypeBadge type={config.type} /></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{config.path}</TableCell>
                    <TableCell><StatusBadge status={config.status} /></TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {config.size}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground">
                등록된 수집 설정이 없습니다
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
