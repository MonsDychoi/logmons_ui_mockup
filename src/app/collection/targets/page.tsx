import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { TargetListTable } from './target-list-table';

export default function TargetsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-start justify-between">
        <Heading
          title="수집 대상 목록"
          description="수집 대상을 확인하고 관리할 수 있습니다"
        />
      </div>
      <Separator />
      <TargetListTable />
    </div>
  );
}
