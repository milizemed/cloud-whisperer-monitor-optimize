
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/lib/types';

interface ActiveAlertsProps {
  alerts: Alert[];
  onAcknowledge: (id: string) => void;
  onResolve: (id: string) => void;
}

const ActiveAlerts = ({ alerts, onAcknowledge, onResolve }: ActiveAlertsProps) => {
  if (alerts.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map(alert => (
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
              onClick={() => onAcknowledge(alert.id)}
            >
              Acknowledge
            </Button>
            <Button 
              size="sm"
              onClick={() => onResolve(alert.id)}
            >
              Resolve
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ActiveAlerts;
