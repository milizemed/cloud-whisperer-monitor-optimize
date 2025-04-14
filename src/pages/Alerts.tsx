
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { generateAlerts } from '@/lib/mock-data';
import { Alert } from '@/lib/types';
import AlertsHeader from '@/components/alerts/AlertsHeader';
import AlertsMetrics from '@/components/alerts/AlertsMetrics';
import AlertsFilters from '@/components/alerts/AlertsFilters';
import ActiveAlerts from '@/components/alerts/ActiveAlerts';
import AlertHistory from '@/components/alerts/AlertHistory';
import AlertSettings from '@/components/alerts/AlertSettings';

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
          <AlertsHeader 
            isLoading={isLoading} 
            autoRefresh={autoRefresh}
            onToggleAutoRefresh={setAutoRefresh}
            onRefresh={refreshData}
          />
          
          <AlertsMetrics 
            criticalCount={criticalCount}
            warningCount={warningCount}
            infoCount={infoCount}
            totalCount={alerts.length}
          />
          
          <AlertsFilters 
            filterProvider={filterProvider}
            filterSeverity={filterSeverity}
            filterService={filterService}
            onProviderChange={setFilterProvider}
            onSeverityChange={setFilterSeverity}
            onServiceChange={setFilterService}
          />
          
          <Tabs defaultValue="active" className="mb-6">
            <TabsList>
              <TabsTrigger value="active">Active Alerts</TabsTrigger>
              <TabsTrigger value="history">Alert History</TabsTrigger>
              <TabsTrigger value="settings">Alert Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-6">
              <ActiveAlerts 
                alerts={filteredAlerts} 
                onAcknowledge={acknowledgeAlert}
                onResolve={resolveAlert}
              />
            </TabsContent>
            
            <TabsContent value="history" className="mt-6">
              <AlertHistory />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <AlertSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AlertsPage;
