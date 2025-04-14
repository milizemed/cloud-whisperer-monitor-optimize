
import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  CloudRain,
  HardDrive,
  ShieldAlert,
  Wifi,
  Cpu
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type AlertSeverity = 'critical' | 'warning' | 'info';
type AlertService = 'compute' | 'storage' | 'database' | 'network' | 'security';

interface Alert {
  id: string;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
  service: AlertService;
  provider: 'aws' | 'azure';
  isNew?: boolean;
}

interface AlertsFeedProps {
  alerts: Alert[];
  className?: string;
}

const AlertsFeed = ({ alerts, className }: AlertsFeedProps) => {
  const severityConfig = {
    critical: {
      icon: <AlertCircle className="h-4 w-4" />,
      color: 'bg-status-critical/10 text-status-critical',
    },
    warning: {
      icon: <AlertTriangle className="h-4 w-4" />,
      color: 'bg-status-warning/10 text-status-warning',
    },
    info: {
      icon: <CheckCircle className="h-4 w-4" />,
      color: 'bg-primary/10 text-primary',
    },
  };

  const serviceIcons = {
    compute: <Cpu className="h-4 w-4" />,
    storage: <HardDrive className="h-4 w-4" />,
    database: <CloudRain className="h-4 w-4" />,
    network: <Wifi className="h-4 w-4" />,
    security: <ShieldAlert className="h-4 w-4" />,
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Alerts & Notifications
        </CardTitle>
        <CardDescription>
          Latest updates from your cloud resources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={cn(
                "p-3 border rounded-md relative", 
                alert.isNew && "bg-muted/50"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={severityConfig[alert.severity].color}>
                    {severityConfig[alert.severity].icon}
                    <span className="ml-1 capitalize">{alert.severity}</span>
                  </Badge>
                  
                  <Badge 
                    variant="outline" 
                    className={cn(
                      alert.provider === 'aws' 
                        ? 'text-aws border-aws/20' 
                        : 'text-azure border-azure/20'
                    )}
                  >
                    {alert.provider.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {alert.timestamp}
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-muted-foreground">
                  {serviceIcons[alert.service]}
                </div>
                <div>
                  <p className="text-sm">{alert.message}</p>
                </div>
              </div>
              
              {alert.isNew && (
                <div className="absolute top-2 right-2">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute h-2 w-2 rounded-full bg-status-critical opacity-75"></span>
                    <span className="relative rounded-full h-2 w-2 bg-status-critical"></span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsFeed;
