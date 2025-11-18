import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DeploymentHistoryTable } from './deployment-history-table';

export default function DeploymentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumbs />
      <div className="flex items-start justify-between">
        <Heading
          title="배포 이력"
          description="에이전트 및 설정 배포 이력을 확인합니다"
        />
      </div>
      <Separator />
      <DeploymentHistoryTable />
    </div>
  );
}
