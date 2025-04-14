
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Shield } from 'lucide-react';

const ComplianceTab = () => {
  return (
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
  );
};

export default ComplianceTab;
