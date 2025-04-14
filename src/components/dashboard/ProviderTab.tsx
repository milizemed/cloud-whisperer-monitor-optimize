
import React from 'react';
import { BarChart3 } from 'lucide-react';

interface ProviderTabProps {
  provider: 'AWS' | 'Azure' | 'GCP';
  color: string;
}

const ProviderTab = ({ provider, color }: ProviderTabProps) => {
  return (
    <div className="rounded-lg border p-8 h-[300px] flex items-center justify-center">
      <div className="text-center">
        <BarChart3 className={`h-10 w-10 text-${color.toLowerCase()} mx-auto mb-4`} />
        <h3 className={`text-xl font-medium text-${color.toLowerCase()} mb-2`}>{provider} Dashboard</h3>
        <p className="text-muted-foreground">
          Detailed {provider} monitoring is available in this tab.
        </p>
      </div>
    </div>
  );
};

export default ProviderTab;
