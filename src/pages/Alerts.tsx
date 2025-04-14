
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Bell, Clock, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const AlertsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const refreshData = () => {
    setIsLoading(true);
    toast.info('Refreshing alerts data...');
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Alerts data refreshed');
    }, 1500);
  };

  const acknowledgeAlert = (id: string) => {
    toast.success(`Alert ${id} acknowledged`);
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
              <h1 className="text-2xl font-bold">Alerts & Notifications</h1>
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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-status-critical" />
                  Critical
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-status-critical">3</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-status-warning" />
                  Warning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-status-warning">7</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-muted-foreground" />
                  Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-status-healthy" />
                  Resolved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-status-healthy">24</div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="active" className="mb-6">
            <TabsList>
              <TabsTrigger value="active">Active Alerts</TabsTrigger>
              <TabsTrigger value="history">Alert History</TabsTrigger>
              <TabsTrigger value="settings">Alert Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg font-medium">High CPU Utilization</CardTitle>
                      <Badge className="bg-status-critical text-white">Critical</Badge>
                    </div>
                    <CardDescription>EC2 instance i-0123456789abcdef0</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      CPU utilization has exceeded 90% for more than 15 minutes.
                      This may indicate resource constraints or application issues.
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      First detected: April 14, 2025 at 10:32 AM (35 minutes ago)
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm" onClick={() => acknowledgeAlert('CPU-001')}>
                      Acknowledge
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg font-medium">Database Connection Failures</CardTitle>
                      <Badge className="bg-status-critical text-white">Critical</Badge>
                    </div>
                    <CardDescription>RDS instance db-prod-main</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Multiple connection failures detected to primary database instance.
                      Applications may experience disruptions.
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      First detected: April 14, 2025 at 11:05 AM (2 minutes ago)
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm" onClick={() => acknowledgeAlert('DB-002')}>
                      Acknowledge
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg font-medium">Storage Capacity Warning</CardTitle>
                      <Badge className="bg-status-warning text-white">Warning</Badge>
                    </div>
                    <CardDescription>S3 Bucket: backup-data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      S3 bucket storage is at 85% of quota limit. Consider increasing storage limit
                      or implementing cleanup procedures.
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      First detected: April 14, 2025 at 09:15 AM (1 hour 52 minutes ago)
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm" onClick={() => acknowledgeAlert('S3-003')}>
                      Acknowledge
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alert History</CardTitle>
                  <CardDescription>Previously triggered and resolved alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Network Latency Spike</p>
                          <p className="text-sm text-muted-foreground">VPC peering connection</p>
                        </div>
                        <Badge className="bg-status-healthy text-white">Resolved</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Resolved: April 13, 2025 at 3:45 PM
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Azure Function Execution Failures</p>
                          <p className="text-sm text-muted-foreground">payment-processor function</p>
                        </div>
                        <Badge className="bg-status-healthy text-white">Resolved</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Resolved: April 13, 2025 at 11:22 AM
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">High Disk I/O</p>
                          <p className="text-sm text-muted-foreground">EC2 instance i-abcdef123456789</p>
                        </div>
                        <Badge className="bg-status-healthy text-white">Resolved</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Resolved: April 12, 2025 at 9:10 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <div className="rounded-lg border p-8 h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <Bell className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Alert Configuration</h3>
                  <p className="text-muted-foreground">
                    Configure alert thresholds, notification channels, and escalation policies.
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

export default AlertsPage;
