
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Globe, Clock, Network, Wifi } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { networkResources } from '@/lib/mock-data';
import NetworkResourcesGrid from '@/components/dashboard/NetworkResourcesGrid';

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Network Resources</h1>
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
          
          <Tabs defaultValue="vpcs" className="mb-6">
            <TabsList>
              <TabsTrigger value="vpcs">VPCs & VNets</TabsTrigger>
              <TabsTrigger value="load-balancers">Load Balancers</TabsTrigger>
              <TabsTrigger value="dns">DNS</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vpcs" className="mt-6">
              <NetworkResourcesGrid resources={vpcsAndVnets} />
            </TabsContent>
            
            <TabsContent value="load-balancers" className="mt-6">
              <NetworkResourcesGrid resources={loadBalancers} />
            </TabsContent>
            
            <TabsContent value="dns" className="mt-6">
              <div className="rounded-lg border p-8 h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">DNS Management</h3>
                  <p className="text-muted-foreground">
                    Manage your Route53 and Azure DNS zones and records.
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

export default NetworkPage;
