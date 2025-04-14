
import React from 'react';
import StatusCard from '@/components/dashboard/StatusCard';
import { CloudService } from '@/lib/types';

interface ServiceStatusGridProps {
  services: CloudService[];
}

const ServiceStatusGrid = ({ services }: ServiceStatusGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {services.map((service, index) => (
        <StatusCard 
          key={index}
          title={service.title}
          provider={service.provider}
          status={service.status}
          description={service.description}
          lastUpdated={service.lastUpdated}
        />
      ))}
    </div>
  );
};

export default ServiceStatusGrid;
