import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { AgentRegistrationWizard } from './agent-registration-wizard';

export default function NewAgentPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumbs />
      <div className="flex items-start justify-between">
        <Heading
          title="에이전트 등록"
          description="새로운 수집 에이전트를 등록합니다"
        />
      </div>
      <Separator />
      <AgentRegistrationWizard />
    </div>
  );
}
