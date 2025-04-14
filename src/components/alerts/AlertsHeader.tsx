
import React from 'react';
import { Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface AlertsHeaderProps {
  isLoading: boolean;
  autoRefresh: boolean;
  onToggleAutoRefresh: (value: boolean) => void;
  onRefresh: () => void;
}

const AlertsHeader = ({ 
  isLoading, 
  autoRefresh, 
  onToggleAutoRefresh, 
  onRefresh 
}: AlertsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Alerts & Notifications</h1>
        <p className="text-muted-foreground mt-1 flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          Last updated: Just now
        </p>
      </div>
      
      <div className="flex items-center gap-4 mt-4 md:mt-0">
        <div className="flex items-center space-x-2">
          <Switch
            id="auto-refresh"
            checked={autoRefresh}
            onCheckedChange={onToggleAutoRefresh}
          />
          <Label htmlFor="auto-refresh">Auto-refresh</Label>
        </div>
        
        <Button 
          variant="outline" 
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>
    </div>
  );
};

export default AlertsHeader;
