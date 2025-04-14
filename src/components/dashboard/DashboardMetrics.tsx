
import React from 'react';
import MetricCard from '@/components/dashboard/MetricCard';
import { MetricsData } from '@/lib/types';

interface DashboardMetricsProps {
  metrics: MetricsData;
}

const DashboardMetrics = ({ metrics }: DashboardMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard 
        title={metrics.totalInstances.title}
        value={metrics.totalInstances.value}
        change={metrics.totalInstances.change}
        data={metrics.totalInstances.data}
        color="hsl(var(--primary))"
      />
      <MetricCard 
        title={metrics.totalStorage.title}
        value={metrics.totalStorage.value}
        change={metrics.totalStorage.change}
        data={metrics.totalStorage.data}
        formatter={(value) => `${value.toFixed(1)} TB`}
        color="#0EA5E9"
      />
      <MetricCard 
        title={metrics.averageCpu.title}
        value={metrics.averageCpu.value}
        change={metrics.averageCpu.change}
        data={metrics.averageCpu.data}
        formatter={(value) => `${value.toFixed(0)}%`}
        color="#8B5CF6"
      />
      <MetricCard 
        title={metrics.costEstimate.title}
        value={metrics.costEstimate.value}
        change={metrics.costEstimate.change}
        data={metrics.costEstimate.data}
        formatter={(value) => `$${value.toLocaleString()}`}
        color="#F97316"
      />
    </div>
  );
};

export default DashboardMetrics;
