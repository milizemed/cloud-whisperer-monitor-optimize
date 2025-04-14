
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, HardDrive, Clock, Database, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { storageResources } from '@/lib/mock-data';

const StoragePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const refreshData = () => {
    setIsLoading(true);
    toast.info('Refreshing storage data...');
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Storage data refreshed');
    }, 1500);
  };

  // Filter storage resources by provider
  const awsStorage = storageResources.filter(resource => resource.provider === 'aws');
  const azureStorage = storageResources.filter(resource => resource.provider === 'azure');
  const gcpStorage = storageResources.filter(resource => resource.provider === 'gcp');
  
  // Filter by type
  const objectStorage = storageResources.filter(resource => resource.storageType === 'object');
  const blockStorage = storageResources.filter(resource => resource.storageType === 'block');
  const fileStorage = storageResources.filter(resource => resource.storageType === 'file');

  const renderStorageResource = (resource: typeof storageResources[0]) => {
    // Set icon color based on provider
    const iconColorClass = 
      resource.provider === 'aws' ? 'text-aws' :
      resource.provider === 'azure' ? 'text-azure' : 'text-gcp';

    // Status color based on resource status
    const statusColorClass = 
      resource.status === 'healthy' ? 'bg-green-500' :
      resource.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500';

    // Calculate usage percentage
    const usagePercentage = Math.round((resource.used / resource.capacity) * 100);
    
    // Get color for usage bar
    const usageColorClass = 
      usagePercentage > 85 ? 'bg-red-500' :
      usagePercentage > 70 ? 'bg-yellow-500' : 'bg-green-500';

    return (
      <Card key={resource.id} className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-medium flex items-center">
              <HardDrive className={`h-5 w-5 mr-2 ${iconColorClass}`} />
              {resource.name}
            </CardTitle>
            <div className="flex items-center">
              <div className={`h-2.5 w-2.5 rounded-full ${statusColorClass} mr-2`}></div>
              <span className="text-xs text-muted-foreground capitalize">{resource.status}</span>
            </div>
          </div>
          <CardDescription className="capitalize">
            {resource.type} - {resource.region}
            {resource.accessTier && ` - ${resource.accessTier}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Usage: {resource.used} GB / {resource.capacity} GB</span>
              <span className="font-medium">{usagePercentage}%</span>
            </div>
            <Progress value={usagePercentage} indicatorClassName={usageColorClass} />
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex items-center">
                <Database className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Disk I/O: {resource.metrics.disk}%</span>
              </div>
              <div className="flex items-center">
                <ArrowUpDown className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Network: {resource.metrics.network}%</span>
              </div>
            </div>
          </div>
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
              <h1 className="text-2xl font-bold">Storage Resources</h1>
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
              <TabsTrigger value="all">All Storage</TabsTrigger>
              <TabsTrigger value="object">Object Storage</TabsTrigger>
              <TabsTrigger value="block">Block Storage</TabsTrigger>
              <TabsTrigger value="file">File Storage</TabsTrigger>
              <TabsTrigger value="aws">AWS</TabsTrigger>
              <TabsTrigger value="azure">Azure</TabsTrigger>
              <TabsTrigger value="gcp">GCP</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {storageResources.map(renderStorageResource)}
              </div>
            </TabsContent>
            
            <TabsContent value="object" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {objectStorage.map(renderStorageResource)}
              </div>
            </TabsContent>
            
            <TabsContent value="block" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blockStorage.map(renderStorageResource)}
              </div>
            </TabsContent>
            
            <TabsContent value="file" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fileStorage.map(renderStorageResource)}
              </div>
            </TabsContent>
            
            <TabsContent value="aws" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {awsStorage.map(renderStorageResource)}
              </div>
            </TabsContent>
            
            <TabsContent value="azure" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {azureStorage.map(renderStorageResource)}
              </div>
            </TabsContent>
            
            <TabsContent value="gcp" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gcpStorage.map(renderStorageResource)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default StoragePage;
