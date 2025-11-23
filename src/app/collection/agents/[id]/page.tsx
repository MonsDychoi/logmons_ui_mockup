'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AgentDetailView } from './agent-detail-view';

export default function AgentDetailPage() {
  const params = useParams();
  const agentId = params.id as string;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/collection/agents">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Heading
            title="에이전트 상세"
            description="에이전트 상세 정보 및 수집 대상 관리"
          />
        </div>
      </div>

      <Separator />

      <AgentDetailView agentId={agentId} />
    </div>
  );
}
