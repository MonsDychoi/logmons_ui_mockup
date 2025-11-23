import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
// LogMons menu structure based on storyboard v2.1
export const navItems: NavItem[] = [
  {
    title: '대시보드',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [
      {
        title: '로그 모니터링',
        url: '/dashboard/log-monitoring',
        shortcut: ['l', 'm']
      },
      {
        title: '차트 생성',
        url: '/dashboard/chart-builder',
        shortcut: ['c', 'b']
      },
      {
        title: '시스템 모니터링',
        url: '/dashboard/system-monitoring',
        shortcut: ['s', 'm']
      }
    ]
  },
  {
    title: '수집관리',
    url: '/collection',
    icon: 'logs',
    isActive: false,
    shortcut: ['c', 'o'],
    items: [
      {
        title: '수집 에이전트 관리',
        url: '/collection/agents',
        shortcut: ['c', 'a']
      },
      {
        title: '수집 대상 관리',
        url: '/collection/targets',
        shortcut: ['c', 't']
      },
      {
        title: '전송 채널 관리',
        url: '/collection/channels',
        shortcut: ['c', 'c']
      },
      {
        title: '배포 이력 관리',
        url: '/collection/deployments',
        shortcut: ['c', 'd']
      }
    ]
  },
  {
    title: '분석관리',
    url: '/analysis',
    icon: 'analytics',
    isActive: false,
    shortcut: ['a', 'n'],
    items: [
      {
        title: '인덱스 관리',
        url: '/analysis/indices',
        shortcut: ['a', 'i']
      },
      {
        title: '로그(분석) 검색',
        url: '/analysis/search',
        shortcut: ['a', 's']
      },
      {
        title: '쿼리 콘솔(Dev Tool)',
        url: '/analysis/console',
        shortcut: ['a', 'c']
      }
    ]
  },
  {
    title: '사용자관리',
    url: '/users',
    icon: 'users',
    shortcut: ['u', 's'],
    isActive: false,
    items: [
      {
        title: '계정 관리',
        url: '/users/accounts',
        shortcut: ['u', 'a']
      },
      {
        title: '권한 관리',
        url: '/users/permissions',
        shortcut: ['u', 'p']
      },
      {
        title: '사용자 로그 이력',
        url: '/users/logs',
        shortcut: ['u', 'l']
      }
    ]
  },
  {
    title: '관리도구 설정',
    url: '/settings',
    icon: 'settings',
    shortcut: ['s', 't'],
    isActive: false,
    items: [
      {
        title: 'CEP',
        url: '/settings/cep',
        shortcut: ['s', 'c']
      },
      {
        title: '이상 감지',
        url: '/settings/anomaly',
        shortcut: ['s', 'a']
      },
      {
        title: 'RBS(Rule-Based System)',
        url: '/settings/rbs',
        shortcut: ['s', 'r']
      },
      {
        title: '예약 작업 설정',
        url: '/settings/scheduled-jobs',
        shortcut: ['s', 'j']
      }
    ]
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
