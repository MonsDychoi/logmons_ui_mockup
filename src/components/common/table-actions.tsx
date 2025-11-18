import { Button } from '@/components/ui/button';
import { Eye, PlayCircle, Square, Trash2, Edit, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export interface ActionButton {
  type: 'view' | 'edit' | 'start' | 'stop' | 'restart' | 'delete' | 'retry';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
}

const ACTION_CONFIG = {
  view: { icon: Eye, label: '상세', className: '' },
  edit: { icon: Edit, label: '수정', className: '' },
  start: { icon: PlayCircle, label: '시작', className: '' },
  stop: { icon: Square, label: '정지', className: '' },
  restart: { icon: PlayCircle, label: '재시작', className: '' },
  delete: { icon: Trash2, label: '삭제', className: 'text-destructive' },
  retry: { icon: RotateCcw, label: '재시도', className: '' }
};

interface TableActionsProps {
  actions: ActionButton[];
}

export function TableActions({ actions }: TableActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      {actions.map((action, index) => {
        const config = ACTION_CONFIG[action.type];
        const Icon = config.icon;
        const label = action.label || config.label;

        const button = (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            disabled={action.disabled}
            onClick={action.onClick}
          >
            <Icon className={`h-4 w-4 mr-1 ${config.className || ''}`} />
            {label}
          </Button>
        );

        return action.href ? (
          <Link key={index} href={action.href}>
            {button}
          </Link>
        ) : (
          button
        );
      })}
    </div>
  );
}
