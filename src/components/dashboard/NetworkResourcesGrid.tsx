
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NetworkResource } from '@/lib/types';
import { Network, Wifi, Globe } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface NetworkResourcesGridProps {
  resources: NetworkResource[];
  filterType?: string;
  filterProvider?: string;
}

const NetworkResourcesGrid = ({ 
  resources, 
  filterType, 
  filterProvider 
}: NetworkResourcesGridProps) => {
  
  // Filter resources based on type and provider if provided
  const filteredResources = resources.filter(resource => {
    const typeMatch = !filterType || resource.type === filterType;
    const providerMatch = !filterProvider || resource.provider === filterProvider;
    return typeMatch && providerMatch;
  });

  // Helper function to get the appropriate icon
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'vpc':
      case 'vnet':
        return <Network className="h-5 w-5 mr-2" />;
      case 'loadbalancer':
        return <Wifi className="h-5 w-5 mr-2" />;
      default:
        return <Globe className="h-5 w-5 mr-2" />;
    }
  };

  // Helper function to get provider color
  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'aws':
        return 'text-aws';
      case 'azure':
        return 'text-azure';
      case 'gcp':
        return 'text-gcp';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {filteredResources.map((resource) => (
        <Card key={resource.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="flex items-center text-lg">
                <span className={getProviderColor(resource.provider)}>
                  {getResourceIcon(resource.type)}
                </span>
                {resource.name}
              </CardTitle>
              <Badge 
                className={`
                  ${resource.status === 'healthy' ? 'bg-status-healthy' : 
                    resource.status === 'warning' ? 'bg-status-warning' : 
                    'bg-status-critical'} text-white
                `}
              >
                {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
              </Badge>
            </div>
            <CardDescription>
              {resource.type.toUpperCase()} - {resource.region}
              {resource.cidr && ` - ${resource.cidr}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resource.throughput && (
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Network Utilization</span>
                    <span>{resource.metrics.network}%</span>
                  </div>
                  <Progress value={resource.metrics.network} className="h-2" />
                </div>
              )}
              
              {resource.throughput && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Inbound</p>
                    <p className="text-sm font-medium">{resource.throughput.inbound} Mbps</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Outbound</p>
                    <p className="text-sm font-medium">{resource.throughput.outbound} Mbps</p>
                  </div>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground flex justify-between pt-2">
                <span>{resource.provider.toUpperCase()}</span>
                <span>Updated {resource.lastUpdated}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NetworkResourcesGrid;
