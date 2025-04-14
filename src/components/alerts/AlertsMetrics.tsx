
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, AlertTriangle, Bell, CheckCircle2 } from 'lucide-react';

interface AlertsMetricsProps {
  criticalCount: number;
  warningCount: number;
  infoCount: number;
  totalCount: number;
}

const AlertsMetrics = ({ 
  criticalCount, 
  warningCount, 
  infoCount, 
  totalCount 
}: AlertsMetricsProps) => {
  return (
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
          <div className="text-3xl font-bold">{totalCount}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsMetrics;
