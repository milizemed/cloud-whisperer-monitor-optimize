
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { CloudProvider } from '@/lib/types';

type StatusType = 'healthy' | 'warning' | 'critical';

interface StatusCardProps {
  title: string;
  provider: CloudProvider;
  status: StatusType;
  description?: string;
  lastUpdated?: string;
  className?: string;
}

const StatusCard = ({
  title,
  provider,
  status,
  description,
  lastUpdated,
  className,
}: StatusCardProps) => {
  const statusConfig = {
    healthy: {
      icon: <CheckCircle className="h-5 w-5 text-status-healthy" />,
      label: 'Healthy',
      color: 'bg-status-healthy/10 text-status-healthy',
    },
    warning: {
      icon: <AlertTriangle className="h-5 w-5 text-status-warning" />,
      label: 'Warning',
      color: 'bg-status-warning/10 text-status-warning',
    },
    critical: {
      icon: <AlertCircle className="h-5 w-5 text-status-critical" />,
      label: 'Critical',
      color: 'bg-status-critical/10 text-status-critical',
    },
  };

  const getProviderColor = () => {
    switch (provider) {
      case 'aws': return 'text-aws';
      case 'azure': return 'text-azure';
      case 'gcp': return 'text-gcp';
      default: return 'text-primary';
    }
  };

  const providerColor = getProviderColor();

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className={cn("h-1", providerColor.replace('text-', 'bg-'))} />
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className={cn("text-lg font-medium", providerColor)}>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={cn("flex items-center gap-1", statusConfig[status].color)}
          >
            {statusConfig[status].icon}
            {statusConfig[status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {lastUpdated && (
          <p className="text-xs text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusCard;
