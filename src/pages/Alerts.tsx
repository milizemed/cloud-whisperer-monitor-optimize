
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Bell, Clock, AlertTriangle, AlertCircle, CheckCircle2, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { generateAlerts } from '@/lib/mock-data';
import { Alert } from '@/lib/types';
import AlertsFeed from '@/components/dashboard/AlertsFeed';

const AlertsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterProvider, setFilterProvider] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string | null>(null);
  const [filterService, setFilterService] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>(generateAlerts(15));

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const refreshData = () => {
    setIsLoading(true);
    toast.info('Refreshing alerts data...');
    
    setTimeout(() => {
      setIsLoading(false);
      const newAlerts = generateAlerts(15);
      setAlerts(newAlerts);
      toast.success('Alerts data refreshed');
    }, 1500);
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isNew: false } : alert
    ));
    toast.success(`Alert ${id} acknowledged`);
  };

  const resolveAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast.success(`Alert ${id} resolved`);
  };

  // Filter alerts based on selected filters
  const filteredAlerts = alerts.filter(alert => {
    const providerMatch = !filterProvider || alert.provider === filterProvider;
    const severityMatch = !filterSeverity || alert.severity === filterSeverity;
    const serviceMatch = !filterService || alert.service === filterService;
    return providerMatch && severityMatch && serviceMatch;
  });

  // Count alerts by severity
  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const warningCount = alerts.filter(a => a.severity === 'warning').length;
  const infoCount = alerts.filter(a => a.severity === 'info').length;

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
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-refresh"
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                />
                <Label htmlFor="auto-refresh">Auto-refresh</Label>
              </div>
              
              <Button 
                variant="outline" 
                onClick={refreshData}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
            </div>
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
                <div className="text-3xl font-bold text-status-critical">{criticalCount}</div>
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
                <div className="text-3xl font-bold text-status-warning">{warningCount}</div>
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
                <div className="text-3xl font-bold">{infoCount}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-status-healthy" />
                  Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{alerts.length}</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="mb-2 block">Provider</Label>
                    <Select
                      value={filterProvider || ""}
                      onValueChange={(value) => setFilterProvider(value || null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Providers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Providers</SelectItem>
                        <SelectItem value="aws">AWS</SelectItem>
                        <SelectItem value="azure">Azure</SelectItem>
                        <SelectItem value="gcp">GCP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Severity</Label>
                    <Select
                      value={filterSeverity || ""}
                      onValueChange={(value) => setFilterSeverity(value || null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Severities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Severities</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Service</Label>
                    <Select
                      value={filterService || ""}
                      onValueChange={(value) => setFilterService(value || null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Services" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Services</SelectItem>
                        <SelectItem value="compute">Compute</SelectItem>
                        <SelectItem value="storage">Storage</SelectItem>
                        <SelectItem value="database">Database</SelectItem>
                        <SelectItem value="network">Network</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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
                {filteredAlerts.length === 0 ? (
                  <Card>
                    <CardContent className="py-10">
                      <div className="text-center">
                        <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-medium mb-2">No alerts found</h3>
                        <p className="text-muted-foreground">
                          There are no alerts matching your current filters.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  filteredAlerts.map(alert => (
                    <Card key={alert.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-lg font-medium">
                            {alert.message}
                          </CardTitle>
                          <Badge className={`
                            ${alert.severity === 'critical' ? 'bg-status-critical' : 
                              alert.severity === 'warning' ? 'bg-status-warning' : 
                              'bg-primary'} text-white
                          `}>
                            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <Badge variant="outline">
                            {alert.provider.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {alert.service.charAt(0).toUpperCase() + alert.service.slice(1)}
                          </Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mt-2 text-sm text-muted-foreground">
                          First detected: {alert.timestamp}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => acknowledgeAlert(alert.id)}
                        >
                          Acknowledge
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => resolveAlert(alert.id)}
                        >
                          Resolve
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how and when you receive alert notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts via email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Critical Alerts Only</p>
                        <p className="text-sm text-muted-foreground">
                          Only notify for critical severity alerts
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Slack Integration</p>
                        <p className="text-sm text-muted-foreground">
                          Send alerts to Slack channels
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-Acknowledge</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically acknowledge info alerts after 1 hour
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AlertsPage;
