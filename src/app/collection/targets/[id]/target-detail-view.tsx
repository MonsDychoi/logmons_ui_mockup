'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable, Column } from '@/components/common/data-table';
import { StatusBadge, StatusType } from '@/components/common/status-badge';
import { TypeBadge } from '@/components/common/type-badge';
import { TableActions, ActionButton } from '@/components/common/table-actions';
import { Rocket, Settings, Plus } from 'lucide-react';
import Link from 'next/link';

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

export function TargetDetailView({ targetId }: { targetId: string }) {
  const [target, setTarget] = useState<TargetDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTargetDetail();
  }, [targetId]);

  const fetchTargetDetail = async () => {
    try {
      setLoading(true);

      const { mockAPI } = await import('@/lib/mock-data/collection');
      const [agents, targets] = await Promise.all([
        mockAPI.getAgents(),
        mockAPI.getTargets()
      ]);

      const agent = agents.find(a => a.id === targetId);
      if (agent) {
        // Filter targets for this agent
        const agentTargets = targets
          .filter(t => t.agent_id === targetId)
          .map(target => {
            const paths = target.collection_config?.paths || [];
            const pathString = Array.isArray(paths) && paths.length > 0
              ? paths.join(', ')
              : '-';

            return {
              id: target.id,
              name: target.name,
              type: target.type,
              path: pathString,
              status: target.status as StatusType,
              size: '-'
            };
          });

        // Format target detail
        const targetDetail: TargetDetail = {
          id: agent.id,
          agentName: agent.name,
          serverIp: agent.server_ip,
          status: agent.status as StatusType,
          version: agent.version,
          installPath: agent.install_path,
          lastCollected: agent.last_connected,
          configs: agentTargets
        };

        setTarget(targetDetail);
      }
    } catch (error) {
      console.error('Failed to fetch target detail:', error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  if (!target) {
    return <div className="text-center py-10">데이터를 찾을 수 없습니다.</div>;
  }

  const columns: Column<CollectionConfig>[] = [
    { header: '대상명', accessor: 'name', className: 'font-medium' },
    { header: '유형', accessor: (row) => <TypeBadge type={row.type} /> },
    { header: '경로', accessor: 'path', className: 'text-sm text-muted-foreground' },
    { header: '상태', accessor: (row) => <StatusBadge status={row.status} /> },
    { header: '크기', accessor: 'size', className: 'text-muted-foreground' },
    {
      header: 'Action',
      accessor: (row) => {
        const actions: ActionButton[] = [
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
              <Link href={`/collection/targets/new?agent=${target.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={target.status === 'disconnected'}
                >
                  <Settings className="h-4 w-4 mr-1" />
                  수집대상 설정
                </Button>
              </Link>
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
        </CardContent>
      </Card>

      {/* 수집 설정 */}
      {target.configs.length > 0 ? (
        <DataTable
          data={target.configs}
          columns={columns}
          title={`수집 설정 (${target.configs.length}개)`}
          rowKey="id"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>수집 설정 (0개)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                등록된 수집 설정이 없습니다
              </p>
              <Link href={`/collection/targets/new?agent=${targetId}`}>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  설정 추가
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
