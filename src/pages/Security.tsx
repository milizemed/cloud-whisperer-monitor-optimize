
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Shield, ShieldCheck, ShieldAlert, Clock, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
              <h1 className="text-2xl font-bold">Security & Compliance</h1>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-status-healthy/10">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg font-medium">Security Score</CardTitle>
                  <ShieldCheck className="h-5 w-5 text-status-healthy" />
                </div>
                <CardDescription>Overall security assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-status-healthy">85%</div>
                <p className="text-sm text-muted-foreground mt-1">Good security posture</p>
              </CardContent>
            </Card>
            
            <Card className="bg-status-warning/10">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg font-medium">Open Findings</CardTitle>
                  <ShieldAlert className="h-5 w-5 text-status-warning" />
                </div>
                <CardDescription>Unresolved security issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-status-warning">12</div>
                <p className="text-sm text-muted-foreground mt-1">3 high, 5 medium, 4 low</p>
              </CardContent>
            </Card>
            
            <Card className="bg-sidebar-accent/10">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg font-medium">Compliance</CardTitle>
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <CardDescription>Regulatory compliance status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">92%</div>
                <p className="text-sm text-muted-foreground mt-1">SOC2, HIPAA, GDPR</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="issues" className="mb-6">
            <TabsList>
              <TabsTrigger value="issues">Security Issues</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="iam">IAM</TabsTrigger>
            </TabsList>
            
            <TabsContent value="issues" className="mt-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg font-medium">Unencrypted S3 Bucket</CardTitle>
                      <Badge className="bg-status-critical text-white">High</Badge>
                    </div>
                    <CardDescription>AWS S3 bucket without encryption enabled</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      The S3 bucket 'user-data-backup' does not have server-side encryption enabled. 
                      This poses a risk to sensitive data stored in the bucket.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="ml-auto">
                      <Shield className="h-4 w-4 mr-2" />
                      Remediate
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg font-medium">Public Security Group</CardTitle>
                      <Badge className="bg-status-critical text-white">High</Badge>
                    </div>
                    <CardDescription>AWS security group with unrestricted access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Security group 'sg-12345' allows unrestricted access (0.0.0.0/0) to port 22 (SSH). 
                      This poses a significant security risk.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="ml-auto">
                      <Shield className="h-4 w-4 mr-2" />
                      Remediate
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg font-medium">Azure NSG Open Ports</CardTitle>
                      <Badge className="bg-status-warning text-white">Medium</Badge>
                    </div>
                    <CardDescription>Network Security Group with open ports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Azure NSG 'app-nsg' has port 3389 (RDP) open to a wide CIDR range. 
                      Consider restricting access to specific IPs.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="ml-auto">
                      <Shield className="h-4 w-4 mr-2" />
                      Remediate
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="compliance" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="h-5 w-5 mr-2" />
                      Compliance Frameworks
                    </CardTitle>
                    <CardDescription>Current compliance status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">SOC 2</p>
                        <Badge className="bg-status-healthy text-white">Compliant</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">HIPAA</p>
                        <Badge className="bg-status-healthy text-white">Compliant</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">GDPR</p>
                        <Badge className="bg-status-warning text-white">Partial</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">PCI DSS</p>
                        <Badge className="bg-status-warning text-white">In Progress</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Recent Compliance Activities
                    </CardTitle>
                    <CardDescription>Last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">SOC 2 Annual Review</p>
                        <p className="text-xs text-muted-foreground">Completed on April 10, 2025</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">GDPR Data Mapping Update</p>
                        <p className="text-xs text-muted-foreground">Completed on April 5, 2025</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">PCI DSS Gap Analysis</p>
                        <p className="text-xs text-muted-foreground">Started on April 1, 2025</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="iam" className="mt-6">
              <div className="rounded-lg border p-8 h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <Lock className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Identity & Access Management</h3>
                  <p className="text-muted-foreground">
                    Manage users, roles, and access policies across cloud providers.
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

export default SecurityPage;
