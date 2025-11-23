import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { TargetRegistrationWizard } from './target-registration-wizard';

export default function NewTargetPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-start justify-between">
        <Heading
          title="수집 대상 등록"
          description="새로운 수집 대상을 등록합니다"
        />
      </div>
      <Separator />
      <TargetRegistrationWizard />
    </div>
  );
}
