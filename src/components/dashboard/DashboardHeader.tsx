
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  isLoading: boolean;
  onRefresh: () => void;
}

const DashboardHeader = ({ title, isLoading, onRefresh }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-1 flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          Last updated: Just now
        </p>
      </div>
      
      <Button 
        variant="outline" 
        className="mt-4 md:mt-0"
        onClick={onRefresh}
        disabled={isLoading}
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh Data
      </Button>
    </div>
  );
};

export default DashboardHeader;
