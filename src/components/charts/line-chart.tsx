'use client';

import React from 'react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

export default function LineChart() {
  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left'
    },
    colors: ['#3ecf8e', '#9CB9FF'],
    chart: {
      fontFamily: 'Inter, sans-serif',
      height: 310,
      type: 'area',
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    stroke: {
      curve: 'smooth',
      width: [2, 2]
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0
      }
    },
    markers: {
      size: 0,
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 6
      }
    },
    grid: {
      borderColor: '#404040',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: true,
      x: {
        format: 'dd MMM yyyy'
      },
      theme: 'dark'
    },
    xaxis: {
      type: 'category',
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#a3a3a3'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          colors: '#a3a3a3'
        }
      },
      title: {
        text: '',
        style: {
          fontSize: '0px'
        }
      }
    }
  };

  const series = [
    {
      name: 'Requests',
      data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235]
    },
    {
      name: 'Errors',
      data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140]
    }
  ];

  return (
    <div className='rounded-lg border bg-card p-6'>
      <h3 className='mb-4 text-lg font-semibold'>Analytics Overview</h3>
      <div className='overflow-x-auto'>
        <div className='min-w-[400px]'>
          <ReactApexChart
            options={options}
            series={series}
            type='area'
            height={310}
          />
        </div>
      </div>
    </div>
  );
}
