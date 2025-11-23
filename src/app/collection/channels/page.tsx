import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ChannelListTable } from './channel-list-table';

export default function ChannelsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-start justify-between">
        <Heading
          title="전송 채널 목록"
          description="데이터 전송 채널을 확인하고 관리할 수 있습니다"
        />
        <Link href="/collection/channels/new">
          <Button className="bg-[#3ecf8e] hover:bg-[#3ecf8e]/90">
            <Plus className="mr-2 h-4 w-4" />
            등록
          </Button>
        </Link>
      </div>
      <Separator />
      <ChannelListTable />
    </div>
  );
}
