
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { securityResources } from '@/lib/mock-data';
import SecurityResourcesGrid from '@/components/dashboard/SecurityResourcesGrid';
import SecurityHeader from '@/components/security/SecurityHeader';
import SecurityMetrics from '@/components/security/SecurityMetrics';
import ComplianceTab from '@/components/security/ComplianceTab';
import IamTab from '@/components/security/IamTab';

const SecurityPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const refreshData = () => {
    setIsLoading(true);
    toast.info('Refreshing security data...');
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Security data refreshed');
    }, 1500);
  };

  const handleRemediate = (id: string) => {
    toast.success(`Remediation started for issue ${id}`);
  };

  // Calculate security score based on findings
  const totalFindings = securityResources.reduce((sum, resource) => sum + resource.findings, 0);
  const criticalFindings = securityResources.reduce((sum, resource) => sum + resource.criticalFindings, 0);
  const securityScore = Math.round(100 - (criticalFindings * 5) - (totalFindings - criticalFindings));

  // Get resources with issues
  const resourcesWithIssues = securityResources.filter(r => r.findings > 0);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={toggleDarkMode} 
        className="w-64 hidden md:block"
      />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <SecurityHeader isLoading={isLoading} onRefresh={refreshData} />
          
          <SecurityMetrics 
            securityScore={securityScore}
            totalFindings={totalFindings}
            criticalFindings={criticalFindings}
          />
          
          <Tabs defaultValue="issues" className="mb-6">
            <TabsList>
              <TabsTrigger value="issues">Security Issues</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="iam">IAM</TabsTrigger>
            </TabsList>
            
            <TabsContent value="issues" className="mt-6">
              <SecurityResourcesGrid 
                resources={resourcesWithIssues}
                onRemediate={handleRemediate}
              />
            </TabsContent>
            
            <TabsContent value="compliance" className="mt-6">
              <ComplianceTab />
            </TabsContent>
            
            <TabsContent value="iam" className="mt-6">
              <IamTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SecurityPage;
