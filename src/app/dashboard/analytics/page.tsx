import LineChart from '@/components/charts/line-chart';
import BarChart from '@/components/charts/bar-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  IconActivity,
  IconAlertTriangle,
  IconClock,
  IconTrendingUp
} from '@tabler/icons-react';

export default function AnalyticsPage() {
  const stats = [
    {
      title: 'Total Requests',
      value: '2,543,891',
      icon: IconActivity,
      trend: '+12.5%',
      isPositive: true
    },
    {
      title: 'Error Rate',
      value: '0.43%',
      icon: IconAlertTriangle,
      trend: '-0.12%',
      isPositive: true
    },
    {
      title: 'Avg Response Time',
      value: '124ms',
      icon: IconClock,
      trend: '-8ms',
      isPositive: true
    },
    {
      title: 'Success Rate',
      value: '99.57%',
      icon: IconTrendingUp,
      trend: '+0.12%',
      isPositive: true
    }
  ];

  return (
    <div className='flex flex-1 flex-col gap-4 p-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Analytics</h1>
          <p className='text-muted-foreground'>
            Monitor your application performance and usage metrics
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  {stat.title}
                </CardTitle>
                <Icon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stat.value}</div>
                <p
                  className={`text-xs ${
                    stat.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className='grid gap-4 md:grid-cols-1 lg:grid-cols-2'>
        <LineChart />
        <BarChart />
      </div>
    </div>
  );
}
