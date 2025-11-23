import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { AgentListTable } from './agent-list-table';

export default function AgentManagementPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-start justify-between">
        <Heading
          title="수집 에이전트 목록"
          description="에이전트 상태를 확인하고 관리할 수 있습니다"
        />
        <Link href="/collection/agents/new">
          <Button className="bg-[#3ecf8e] hover:bg-[#3ecf8e]/90">
            <Plus className="mr-2 h-4 w-4" />
            등록
          </Button>
        </Link>
      </div>
      <Separator />
      <AgentListTable />
    </div>
  );
}
