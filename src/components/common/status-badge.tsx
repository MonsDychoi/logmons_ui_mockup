import { Badge } from '@/components/ui/badge';

export type StatusType = 'normal' | 'active' | 'disconnected' | 'inactive' | 'error' | 'warning' | 'success' | 'failed' | 'in_progress';

interface StatusConfig {
  className: string;
  label: string;
}

const STATUS_CONFIGS: Record<StatusType, StatusConfig> = {
  normal: {
    className: 'bg-[#3ecf8e]/10 text-[#3ecf8e] hover:bg-[#3ecf8e]/20',
    label: '정상'
  },
  active: {
    className: 'bg-[#3ecf8e]/10 text-[#3ecf8e] hover:bg-[#3ecf8e]/20',
    label: '활성'
  },
  disconnected: {
    className: 'text-yellow-600 border-yellow-600',
    label: '미연결'
  },
  inactive: {
    className: 'text-yellow-600 border-yellow-600',
    label: '비활성'
  },
  error: {
    className: '',
    label: '오류'
  },
  warning: {
    className: 'text-orange-600 border-orange-600',
    label: '경고'
  },
  success: {
    className: 'bg-[#3ecf8e]/10 text-[#3ecf8e] hover:bg-[#3ecf8e]/20',
    label: '성공'
  },
  failed: {
    className: '',
    label: '실패'
  },
  in_progress: {
    className: 'text-blue-600 border-blue-600',
    label: '진행중'
  }
};

interface StatusBadgeProps {
  status: StatusType;
  showDot?: boolean;
}

export function StatusBadge({ status, showDot = true }: StatusBadgeProps) {
  const config = STATUS_CONFIGS[status];
  const variant = ['error', 'failed'].includes(status) ? 'destructive' : 'outline';

  return (
    <Badge
      variant={variant}
      className={config.className}
    >
      {showDot && <span className="mr-1">●</span>}
      {config.label}
    </Badge>
  );
}
