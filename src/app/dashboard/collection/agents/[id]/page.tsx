import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { AgentDetailView } from './agent-detail-view';

export default async function AgentDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumbs />
      <div className="flex items-start justify-between">
        <Heading title="에이전트 상세" description="에이전트의 상세 정보를 확인합니다" />
      </div>
      <Separator />
      <AgentDetailView agentId={id} />
    </div>
  );
}
