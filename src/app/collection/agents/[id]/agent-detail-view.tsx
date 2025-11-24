'use client';

import { useEffect, useState } from 'react';
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

// 스토리보드 UI-LM-MA-002: 에이전트 상세 페이지
interface AgentTarget {
  id: string;
  name: string;
  status: StatusType;
  size: string;
}

interface AgentDetail {
  id: string;
  name: string;
  serverIp: string;
  version: string;
  installPath: string;
  status: StatusType;
  collectionRate: string;
  processedEvents: number;
  errorRate: string;
  lastConnection: string;
  targets: AgentTarget[];
  targetCount: number;
  activeTargetCount: number;
}

export function AgentDetailView({ agentId }: { agentId: string }) {
  const [agent, setAgent] = useState<AgentDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgentDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentId]);

  const fetchAgentDetail = async () => {
    try {
      setLoading(true);

      const { mockAPI } = await import('@/lib/mock-data/collection');
      const [agents, targets] = await Promise.all([
        mockAPI.getAgents(),
        mockAPI.getTargets()
      ]);

      const agentData = agents.find(a => a.id === agentId);
      if (agentData) {
        // Filter targets for this agent
        const agentTargets: AgentTarget[] = targets
          .filter(t => t.agent_id === agentId)
          .map(target => ({
            id: target.id,
            name: target.name,
            status: target.status as StatusType,
            size: '-'
          }));

        const activeTargets = agentTargets.filter(t => t.status === 'normal').length;

        // Format agent detail
        const agentDetail: AgentDetail = {
          id: agentData.id,
          name: agentData.name,
          serverIp: agentData.server_ip,
          version: agentData.version,
          installPath: agentData.install_path,
          status: agentData.status as StatusType,
          collectionRate: `${agentTargets.length * 100}/s`,
          processedEvents: agentTargets.length * 15000,
          errorRate: '0.1%',
          lastConnection: agentData.last_connected,
          targets: agentTargets,
          targetCount: agentTargets.length,
          activeTargetCount: activeTargets
        };

        setAgent(agentDetail);
      }
    } catch (error) {
      console.error('Failed to fetch agent detail:', error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  if (!agent) {
    return <div className="text-center py-10">데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="space-y-4">
      {/* Status Metrics - 4개 카드 */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* 1. 상태 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">상태</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <StatusBadge status={agent.status} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              수집 대상: {agent.targetCount}개 (정상 {agent.activeTargetCount}개)
            </p>
          </CardContent>
        </Card>

        {/* 2. 수집율 */}
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

        {/* 3. 처리된 이벤트 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">처리된 이벤트</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agent.processedEvents.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">전체 누적</p>
          </CardContent>
        </Card>

        {/* 4. 오류율 */}
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
          <CardTitle>수집 대상 ({agent.targets.length}개)</CardTitle>
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>최근 작업 이력</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">시간</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground w-[200px]">2024-01-15 14:23:15</TableCell>
                <TableCell className="font-medium">수집 대상 배포 완료</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground w-[200px]">2024-01-15 12:10:45</TableCell>
                <TableCell className="font-medium">에이전트 재시작</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground w-[200px]">2024-01-15 09:05:20</TableCell>
                <TableCell className="font-medium">수집 대상 수정</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground w-[200px]">2024-01-14 16:45:30</TableCell>
                <TableCell className="font-medium">수집 대상 등록</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground w-[200px]">2024-01-14 14:20:10</TableCell>
                <TableCell className="font-medium">에이전트 시작</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground w-[200px]">2024-01-14 11:15:05</TableCell>
                <TableCell className="font-medium">수집 대상 삭제</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground w-[200px]">2024-01-13 18:30:22</TableCell>
                <TableCell className="font-medium">에이전트 정지</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground w-[200px]">2024-01-13 15:45:18</TableCell>
                <TableCell className="font-medium">에이전트 배포 실패</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
