
import React from 'react';
import { Globe } from 'lucide-react';
import NetworkResourcesGrid from '@/components/dashboard/NetworkResourcesGrid';
import { NetworkResource } from '@/lib/types';

interface NetworkTabContentProps {
  resources?: NetworkResource[];
  title?: string;
  description?: string;
}

const NetworkTabContent = ({ resources, title, description }: NetworkTabContentProps) => {
  if (resources && resources.length > 0) {
    return <NetworkResourcesGrid resources={resources} />;
  }

  return (
    <div className="rounded-lg border p-8 h-[300px] flex items-center justify-center">
      <div className="text-center">
        <Globe className="h-10 w-10 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">{title || "Network Management"}</h3>
        <p className="text-muted-foreground">
          {description || "Manage your network resources across cloud providers."}
        </p>
      </div>
    </div>
  );
};

export default NetworkTabContent;
