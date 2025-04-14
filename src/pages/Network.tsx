
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { networkResources } from '@/lib/mock-data';
import NetworkHeader from '@/components/network/NetworkHeader';
import NetworkTabContent from '@/components/network/NetworkTabContent';

const NetworkPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const refreshData = () => {
    setIsLoading(true);
    toast.info('Refreshing network data...');
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Network data refreshed');
    }, 1500);
  };

  // Filter resources by type
  const vpcsAndVnets = networkResources.filter(
    r => r.type === 'vpc' || r.type === 'vnet'
  );
  
  const loadBalancers = networkResources.filter(
    r => r.type === 'loadbalancer'
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={toggleDarkMode} 
        className="w-64 hidden md:block"
      />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <NetworkHeader isLoading={isLoading} onRefresh={refreshData} />
          
          <Tabs defaultValue="vpcs" className="mb-6">
            <TabsList>
              <TabsTrigger value="vpcs">VPCs & VNets</TabsTrigger>
              <TabsTrigger value="load-balancers">Load Balancers</TabsTrigger>
              <TabsTrigger value="dns">DNS</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vpcs" className="mt-6">
              <NetworkTabContent resources={vpcsAndVnets} />
            </TabsContent>
            
            <TabsContent value="load-balancers" className="mt-6">
              <NetworkTabContent resources={loadBalancers} />
            </TabsContent>
            
            <TabsContent value="dns" className="mt-6">
              <NetworkTabContent 
                title="DNS Management" 
                description="Manage your Route53 and Azure DNS zones and records." 
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default NetworkPage;
