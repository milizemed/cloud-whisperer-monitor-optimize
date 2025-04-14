
import { TimeSeriesDataPoint } from '@/lib/types';

// Generate timestamps for the past 24 hours, every hour
const generateTimepoints = (hours: number = 24, interval: number = 1) => {
  const points = [];
  for (let i = hours; i >= 0; i -= interval) {
    const date = new Date();
    date.setHours(date.getHours() - i);
    points.push(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }
  return points;
};

// Generate random values within a range
const generateRandomValues = (
  count: number, 
  min: number = 0, 
  max: number = 100, 
  trend?: 'up' | 'down' | 'stable'
) => {
  const values = [];
  let lastValue = Math.random() * (max - min) + min;
  
  for (let i = 0; i < count; i++) {
    if (trend === 'up') {
      lastValue = Math.min(max, lastValue + (Math.random() * 10));
    } else if (trend === 'down') {
      lastValue = Math.max(min, lastValue - (Math.random() * 10));
    } else if (trend === 'stable') {
      lastValue = lastValue + (Math.random() * 6) - 3;
      lastValue = Math.max(min, Math.min(max, lastValue));
    } else {
      lastValue = Math.random() * (max - min) + min;
    }
    
    values.push(Math.round(lastValue * 10) / 10);
  }
  
  return values;
};

// Generate time series data for charts
export const generateTimeSeriesData = (
  hours: number = 24, 
  metrics: string[] = ['cpu'], 
  trend?: 'up' | 'down' | 'stable'
): TimeSeriesDataPoint[] => {
  const timePoints = generateTimepoints(hours);
  const values: Record<string, number[]> = {};
  
  metrics.forEach(metric => {
    values[metric] = generateRandomValues(timePoints.length, 0, 100, trend);
  });
  
  return timePoints.map((time, index) => {
    const dataPoint: Record<string, any> = { time };
    metrics.forEach(metric => {
      dataPoint[metric] = values[metric][index];
    });
    return dataPoint as TimeSeriesDataPoint;
  });
};

// Resource usage data for line charts
export const resourceUsageData: TimeSeriesDataPoint[] = generateTimeSeriesData(24, ['awsCpu', 'azureCpu', 'gcpCpu']);
export const networkUsageData: TimeSeriesDataPoint[] = generateTimeSeriesData(24, ['ingress', 'egress']);
export const storageUsageData: TimeSeriesDataPoint[] = generateTimeSeriesData(24, ['s3', 'ebs', 'azureBlob', 'gcpStorage'], 'up');
