
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Database, Clock, HardDrive, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
          
          <Tabs defaultValue="object" className="mb-6">
            <TabsList>
              <TabsTrigger value="object">Object Storage</TabsTrigger>
              <TabsTrigger value="block">Block Storage</TabsTrigger>
              <TabsTrigger value="database">Databases</TabsTrigger>
            </TabsList>
            
            <TabsContent value="object" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-aws">
                      <Database className="h-5 w-5 mr-2" />
                      S3 Buckets
                    </CardTitle>
                    <CardDescription>AWS S3 Storage Usage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">production-assets</span>
                          <span className="text-sm text-muted-foreground">1.2 TB / 5 TB</span>
                        </div>
                        <Progress value={24} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">user-uploads</span>
                          <span className="text-sm text-muted-foreground">3.8 TB / 5 TB</span>
                        </div>
                        <Progress value={76} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">backup-data</span>
                          <span className="text-sm text-muted-foreground">4.2 TB / 5 TB</span>
                        </div>
                        <Progress value={84} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-azure">
                      <Database className="h-5 w-5 mr-2" />
                      Azure Blob Storage
                    </CardTitle>
                    <CardDescription>Azure Storage Usage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">app-storage</span>
                          <span className="text-sm text-muted-foreground">0.8 TB / 2 TB</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">media-content</span>
                          <span className="text-sm text-muted-foreground">1.5 TB / 2 TB</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">analytics-data</span>
                          <span className="text-sm text-muted-foreground">0.3 TB / 1 TB</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="block" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-aws">
                      <HardDrive className="h-5 w-5 mr-2" />
                      EBS Volumes
                    </CardTitle>
                    <CardDescription>AWS Block Storage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">vol-12345 (gp3)</span>
                          <span className="text-sm text-muted-foreground">80 GB / 100 GB</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">vol-67890 (io1)</span>
                          <span className="text-sm text-muted-foreground">120 GB / 200 GB</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-azure">
                      <HardDrive className="h-5 w-5 mr-2" />
                      Azure Disks
                    </CardTitle>
                    <CardDescription>Azure Block Storage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">disk-abcde (Premium SSD)</span>
                          <span className="text-sm text-muted-foreground">90 GB / 128 GB</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">disk-fghij (Standard SSD)</span>
                          <span className="text-sm text-muted-foreground">45 GB / 64 GB</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="database" className="mt-6">
              <div className="rounded-lg border p-8 h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Database Management</h3>
                  <p className="text-muted-foreground">
                    Monitor and manage your cloud databases.
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

export default StoragePage;
