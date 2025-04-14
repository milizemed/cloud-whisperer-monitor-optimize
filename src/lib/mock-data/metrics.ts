
import { MetricsData } from '../types';

// Metric data for cards
export const metrics: MetricsData = {
  totalInstances: {
    title: 'Total Instances',
    value: '164',
    change: { value: 12, trend: 'up' },
    data: [
      { name: '00:00', value: 130 },
      { name: '04:00', value: 132 },
      { name: '08:00', value: 137 },
      { name: '12:00', value: 145 },
      { name: '16:00', value: 160 },
      { name: '20:00', value: 164 }
    ]
  },
  totalStorage: {
    title: 'Storage Usage',
    value: '8.7 TB',
    change: { value: 5, trend: 'up' },
    data: [
      { name: '00:00', value: 7.6 },
      { name: '04:00', value: 7.8 },
      { name: '08:00', value: 8.1 },
      { name: '12:00', value: 8.3 },
      { name: '16:00', value: 8.5 },
      { name: '20:00', value: 8.7 }
    ]
  },
  averageCpu: {
    title: 'Avg. CPU Usage',
    value: '42%',
    change: { value: 7, trend: 'down' },
    data: [
      { name: '00:00', value: 58 },
      { name: '04:00', value: 54 },
      { name: '08:00', value: 52 },
      { name: '12:00', value: 47 },
      { name: '16:00', value: 45 },
      { name: '20:00', value: 42 }
    ]
  },
  costEstimate: {
    title: 'Monthly Cost Est.',
    value: '$12,845',
    change: { value: 3, trend: 'up' },
    data: [
      { name: '00:00', value: 12100 },
      { name: '04:00', value: 12300 },
      { name: '08:00', value: 12400 },
      { name: '12:00', value: 12500 },
      { name: '16:00', value: 12700 },
      { name: '20:00', value: 12845 }
    ]
  }
};
