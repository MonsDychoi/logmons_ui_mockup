'use client';

import React from 'react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

export default function BarChart() {
  const options: ApexOptions = {
    colors: ['#3ecf8e'],
    chart: {
      fontFamily: 'Inter, sans-serif',
      type: 'bar',
      height: 300,
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
        borderRadiusApplication: 'end'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent']
    },
    xaxis: {
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
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Inter',
      labels: {
        colors: '#e5e5e5'
      }
    },
    yaxis: {
      title: {
        text: undefined
      },
      labels: {
        style: {
          colors: '#a3a3a3'
        }
      }
    },
    grid: {
      borderColor: '#404040',
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false
      },
      y: {
        formatter: (val: number) => `${val}`
      }
    }
  };

  const series = [
    {
      name: 'Active Users',
      data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112]
    }
  ];

  return (
    <div className='rounded-lg border bg-card p-6'>
      <h3 className='mb-4 text-lg font-semibold'>Monthly Activity</h3>
      <div className='overflow-x-auto'>
        <div className='min-w-[400px]'>
          <ReactApexChart
            options={options}
            series={series}
            type='bar'
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
