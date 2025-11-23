import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { TargetDetailView } from './target-detail-view';

export default async function TargetDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-start justify-between">
        <Heading title="수집 대상 상세" description="수집 대상의 상세 정보를 확인합니다" />
      </div>
      <Separator />
      <TargetDetailView targetId={id} />
    </div>
  );
}
