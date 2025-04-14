
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import ServiceStatusGrid from '@/components/dashboard/ServiceStatusGrid';
import DashboardCharts from '@/components/dashboard/DashboardCharts';
import ProviderTab from '@/components/dashboard/ProviderTab';
import { 
  cloudServices, 
  metrics, 
  resourceUsageData, 
  networkUsageData, 
  storageUsageData,
  alertsData
} from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
          <DashboardHeader 
            title="Cloud Monitoring Dashboard" 
            isLoading={isLoading} 
            onRefresh={refreshData} 
          />
          
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="aws">AWS</TabsTrigger>
              <TabsTrigger value="azure">Azure</TabsTrigger>
              <TabsTrigger value="gcp">GCP</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <DashboardMetrics metrics={metrics} />
              <ServiceStatusGrid services={cloudServices} />
              <DashboardCharts 
                resourceUsageData={resourceUsageData}
                networkUsageData={networkUsageData}
                storageUsageData={storageUsageData}
                alerts={alertsData}
              />
            </TabsContent>
            
            <TabsContent value="aws" className="mt-6">
              <ProviderTab provider="AWS" color="aws" />
            </TabsContent>
            
            <TabsContent value="azure" className="mt-6">
              <ProviderTab provider="Azure" color="azure" />
            </TabsContent>
            
            <TabsContent value="gcp" className="mt-6">
              <ProviderTab provider="GCP" color="gcp" />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
