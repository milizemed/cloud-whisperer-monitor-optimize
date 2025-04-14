
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Server, Clock, Cpu, HardDrive, Wifi, Database } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { computeInstances } from '@/lib/mock-data';

const ComputePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const refreshData = () => {
    setIsLoading(true);
    toast.info('Refreshing compute data...');
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Compute data refreshed');
    }, 1500);
  };

  // Filter instances by provider
  const awsInstances = computeInstances.filter(instance => instance.provider === 'aws');
  const azureInstances = computeInstances.filter(instance => instance.provider === 'azure');
  const gcpInstances = computeInstances.filter(instance => instance.provider === 'gcp');

  const renderComputeInstance = (instance: typeof computeInstances[0]) => {
    // Set icon color based on provider
    const iconColorClass = 
      instance.provider === 'aws' ? 'text-aws' :
      instance.provider === 'azure' ? 'text-azure' : 'text-gcp';

    // Status color based on instance status
    const statusColorClass = 
      instance.status === 'healthy' ? 'bg-green-500' :
      instance.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500';

    return (
      <Card key={instance.id} className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-medium flex items-center">
              <Server className={`h-5 w-5 mr-2 ${iconColorClass}`} />
              {instance.name}
            </CardTitle>
            <div className="flex items-center">
              <div className={`h-2.5 w-2.5 rounded-full ${statusColorClass} mr-2`}></div>
              <span className="text-xs text-muted-foreground capitalize">{instance.status}</span>
            </div>
          </div>
          <CardDescription>{instance.instanceType} - {instance.region}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <Cpu className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">CPU: {instance.metrics.cpu}%</span>
            </div>
            <div className="flex items-center">
              <HardDrive className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">RAM: {instance.metrics.memory}%</span>
            </div>
            <div className="flex items-center">
              <Database className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">Disk: {instance.metrics.disk}%</span>
            </div>
            <div className="flex items-center">
              <Wifi className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">Network: {instance.metrics.network}%</span>
            </div>
          </div>
          {instance.publicIp && (
            <div className="mt-2 text-xs text-muted-foreground">
              Public IP: {instance.publicIp} | Private IP: {instance.privateIp}
            </div>
          )}
        </CardContent>
      </Card>
    );
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
              <h1 className="text-2xl font-bold">Compute Resources</h1>
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
          
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Instances</TabsTrigger>
              <TabsTrigger value="aws">AWS</TabsTrigger>
              <TabsTrigger value="azure">Azure</TabsTrigger>
              <TabsTrigger value="gcp">GCP</TabsTrigger>
              <TabsTrigger value="containers">Containers</TabsTrigger>
              <TabsTrigger value="serverless">Serverless</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {computeInstances.map(renderComputeInstance)}
              </div>
            </TabsContent>
            
            <TabsContent value="aws" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {awsInstances.map(renderComputeInstance)}
              </div>
            </TabsContent>
            
            <TabsContent value="azure" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {azureInstances.map(renderComputeInstance)}
              </div>
            </TabsContent>
            
            <TabsContent value="gcp" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gcpInstances.map(renderComputeInstance)}
              </div>
            </TabsContent>
            
            <TabsContent value="containers" className="mt-6">
              <div className="rounded-lg border p-8 h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <Server className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Container Management</h3>
                  <p className="text-muted-foreground">
                    Manage your containers and Kubernetes clusters.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="serverless" className="mt-6">
              <div className="rounded-lg border p-8 h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <Server className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Serverless Functions</h3>
                  <p className="text-muted-foreground">
                    Manage AWS Lambda, Azure Functions, and Cloud Functions.
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

export default ComputePage;
