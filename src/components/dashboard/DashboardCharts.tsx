
import React from 'react';
import ResourceUsageChart from '@/components/dashboard/ResourceUsageChart';
import AlertsFeed from '@/components/dashboard/AlertsFeed';
import { Alert, TimeSeriesDataPoint } from '@/lib/types';

interface DashboardChartsProps {
  resourceUsageData: TimeSeriesDataPoint[];
  networkUsageData: TimeSeriesDataPoint[];
  storageUsageData: TimeSeriesDataPoint[];
  alerts: Alert[];
}

const DashboardCharts = ({ 
  resourceUsageData, 
  networkUsageData, 
  storageUsageData,
  alerts 
}: DashboardChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ResourceUsageChart 
        title="CPU Utilization"
        description="Average CPU usage over time"
        data={resourceUsageData}
        lines={[
          { name: 'AWS', dataKey: 'awsCpu', stroke: '#FF9900' },
          { name: 'Azure', dataKey: 'azureCpu', stroke: '#0078D4' }
        ]}
        yAxisFormatter={(value) => `${value}%`}
      />
      
      <ResourceUsageChart 
        title="Network Traffic"
        description="Inbound and outbound network traffic"
        data={networkUsageData}
        lines={[
          { name: 'Inbound', dataKey: 'ingress', stroke: '#4CAF50', fill: '#4CAF50' },
          { name: 'Outbound', dataKey: 'egress', stroke: '#2196F3', fill: '#2196F3' }
        ]}
        yAxisFormatter={(value) => `${value} GB`}
        type="area"
      />
      
      <ResourceUsageChart 
        title="Storage Usage"
        description="Storage allocation across services"
        data={storageUsageData}
        lines={[
          { name: 'S3', dataKey: 's3', stroke: '#FF9900', fill: '#FF9900' },
          { name: 'EBS', dataKey: 'ebs', stroke: '#D13212', fill: '#D13212' },
          { name: 'Azure Blob', dataKey: 'azureBlob', stroke: '#0078D4', fill: '#0078D4' }
        ]}
        type="area"
        stacked={true}
      />
      
      <AlertsFeed alerts={alerts} />
    </div>
  );
};

export default DashboardCharts;
