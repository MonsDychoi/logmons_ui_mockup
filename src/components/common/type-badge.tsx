import { Badge } from '@/components/ui/badge';

const TYPE_COLORS: Record<string, string> = {
  // Target types
  File: 'bg-blue-500/10 text-blue-500',
  Database: 'bg-purple-500/10 text-purple-500',
  System: 'bg-orange-500/10 text-orange-500',
  API: 'bg-green-500/10 text-green-500',

  // Channel types
  Elasticsearch: 'bg-yellow-500/10 text-yellow-600',
  Kafka: 'bg-purple-500/10 text-purple-500',
  S3: 'bg-orange-500/10 text-orange-500',
  Splunk: 'bg-green-500/10 text-green-600',
  EventHub: 'bg-blue-500/10 text-blue-500',

  // Deployment types
  Agent: 'bg-blue-500/10 text-blue-500',
  Config: 'bg-purple-500/10 text-purple-500',
  Rollback: 'bg-orange-500/10 text-orange-500'
};

interface TypeBadgeProps {
  type: string;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const colorClass = TYPE_COLORS[type] || 'bg-gray-500/10 text-gray-500';

  return (
    <Badge className={colorClass}>
      {type}
    </Badge>
  );
}
