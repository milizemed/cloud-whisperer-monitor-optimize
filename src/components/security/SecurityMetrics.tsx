
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

interface SecurityMetricsProps {
  securityScore: number;
  totalFindings: number;
  criticalFindings: number;
}

const SecurityMetrics = ({ securityScore, totalFindings, criticalFindings }: SecurityMetricsProps) => {
  return (
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
          <div className="text-3xl font-bold text-status-healthy">{securityScore}%</div>
          <p className="text-sm text-muted-foreground mt-1">
            {securityScore >= 90 ? 'Excellent' : securityScore >= 80 ? 'Good' : securityScore >= 70 ? 'Fair' : 'Poor'} security posture
          </p>
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
          <div className="text-3xl font-bold text-status-warning">{totalFindings}</div>
          <p className="text-sm text-muted-foreground mt-1">
            {criticalFindings} critical, {totalFindings - criticalFindings} other
          </p>
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
  );
};

export default SecurityMetrics;
