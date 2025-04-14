
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import StatusCard from '@/components/dashboard/StatusCard';
import MetricCard from '@/components/dashboard/MetricCard';
import ResourceUsageChart from '@/components/dashboard/ResourceUsageChart';
import AlertsFeed from '@/components/dashboard/AlertsFeed';
import { 
  cloudServices, 
  metrics, 
  resourceUsageData, 
  networkUsageData, 
  storageUsageData,
  alertsData
} from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Clock,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Set up initial theme based on user preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Function to simulate refreshing data
  const refreshData = () => {
    setIsLoading(true);
    toast.info('Refreshing dashboard data...');
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Dashboard data refreshed');
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={toggleDarkMode} 
        className="w-64 hidden md:block"
      />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Cloud Monitoring Dashboard</h1>
              <p className="text-muted-foreground mt-1 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last updated: Just now
              </p>
            </div>
            
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0"
              onClick={refreshData}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>
          
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="aws">AWS</TabsTrigger>
              <TabsTrigger value="azure">Azure</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {cloudServices.map((service, index) => (
                  <StatusCard 
                    key={index}
                    title={service.title}
                    provider={service.provider as 'aws' | 'azure'}
                    status={service.status as 'healthy' | 'warning' | 'critical'}
                    description={service.description}
                    lastUpdated={service.lastUpdated}
                  />
                ))}
              </div>
              
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
                
                <AlertsFeed 
                  alerts={alertsData}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="aws" className="mt-6">
              <div className="rounded-lg border p-8 h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-10 w-10 text-aws mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-aws mb-2">AWS Dashboard</h3>
                  <p className="text-muted-foreground">
                    Detailed AWS monitoring is available in this tab.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="azure" className="mt-6">
              <div className="rounded-lg border p-8 h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-10 w-10 text-azure mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-azure mb-2">Azure Dashboard</h3>
                  <p className="text-muted-foreground">
                    Detailed Azure monitoring is available in this tab.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
