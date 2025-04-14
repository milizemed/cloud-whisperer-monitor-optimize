
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const AlertHistory = () => {
  return (
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
  );
};

export default AlertHistory;
