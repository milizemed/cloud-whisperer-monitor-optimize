
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SecurityResource } from '@/lib/types';
import { Shield, ShieldAlert, Lock, ShieldCheck } from 'lucide-react';

interface SecurityResourcesGridProps {
  resources: SecurityResource[];
  filterScope?: string;
  filterProvider?: string;
  onRemediate?: (id: string) => void;
}

const SecurityResourcesGrid = ({ 
  resources, 
  filterScope, 
  filterProvider,
  onRemediate
}: SecurityResourcesGridProps) => {
  
  // Filter resources based on scope and provider if provided
  const filteredResources = resources.filter(resource => {
    const scopeMatch = !filterScope || resource.scope === filterScope;
    const providerMatch = !filterProvider || resource.provider === filterProvider;
    return scopeMatch && providerMatch;
  });

  // Helper function to get the appropriate icon
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'security-hub':
      case 'security-center':
        return <Shield className="h-5 w-5 mr-2" />;
      case 'threat-detection':
        return <ShieldAlert className="h-5 w-5 mr-2" />;
      case 'key-vault':
      case 'access-control':
      case 'access-analyzer':
        return <Lock className="h-5 w-5 mr-2" />;
      default:
        return <ShieldCheck className="h-5 w-5 mr-2" />;
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
    <div className="space-y-4">
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
                  ${resource.complianceStatus === 'compliant' ? 'bg-status-healthy' : 
                    resource.complianceStatus === 'non-compliant' ? 'bg-status-critical' : 
                    'bg-muted'} text-white
                `}
              >
                {resource.complianceStatus === 'compliant' ? 'Compliant' : 
                  resource.complianceStatus === 'non-compliant' ? 'Non-Compliant' : 
                  'Not Applicable'}
              </Badge>
            </div>
            <CardDescription>
              {resource.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} - {resource.scope.charAt(0).toUpperCase() + resource.scope.slice(1)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-muted-foreground">Total Findings</p>
                  <p className="text-lg font-medium">{resource.findings}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Critical</p>
                  <p className={`text-lg font-medium ${resource.criticalFindings > 0 ? 'text-status-critical' : ''}`}>
                    {resource.criticalFindings}
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground flex justify-between pt-2">
                <span>{resource.provider.toUpperCase()}</span>
                <span>Updated {resource.lastUpdated}</span>
              </div>
            </div>
          </CardContent>
          {resource.criticalFindings > 0 && onRemediate && (
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-auto"
                onClick={() => onRemediate(resource.id)}
              >
                <Shield className="h-4 w-4 mr-2" />
                Remediate Issues
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};

export default SecurityResourcesGrid;
