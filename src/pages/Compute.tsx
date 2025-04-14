
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Server, Clock, Cpu, Memory } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
          
          <Tabs defaultValue="instances" className="mb-6">
            <TabsList>
              <TabsTrigger value="instances">Instances</TabsTrigger>
              <TabsTrigger value="containers">Containers</TabsTrigger>
              <TabsTrigger value="serverless">Serverless</TabsTrigger>
            </TabsList>
            
            <TabsContent value="instances" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <Server className="h-5 w-5 mr-2 text-aws" />
                      EC2 Instance i-123456
                    </CardTitle>
                    <CardDescription>t3.large - us-west-2</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">CPU: 35%</span>
                      </div>
                      <div className="flex items-center">
                        <Memory className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">RAM: 2.4 GB</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <Server className="h-5 w-5 mr-2 text-aws" />
                      EC2 Instance i-789012
                    </CardTitle>
                    <CardDescription>m5.xlarge - us-east-1</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">CPU: 22%</span>
                      </div>
                      <div className="flex items-center">
                        <Memory className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">RAM: 4.8 GB</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <Server className="h-5 w-5 mr-2 text-azure" />
                      Azure VM vm-345678
                    </CardTitle>
                    <CardDescription>Standard_D2s_v3 - eastus</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">CPU: 18%</span>
                      </div>
                      <div className="flex items-center">
                        <Memory className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">RAM: 3.2 GB</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                    Manage AWS Lambda and Azure Functions.
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
