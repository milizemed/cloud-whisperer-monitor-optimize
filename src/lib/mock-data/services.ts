
import { CloudService } from '../types';

// Cloud service status data
export const cloudServices: CloudService[] = [
  {
    title: 'EC2 Compute',
    provider: 'aws',
    status: 'healthy',
    description: 'Amazon Elastic Compute Cloud',
    lastUpdated: '2 minutes ago'
  },
  {
    title: 'S3 Storage',
    provider: 'aws',
    status: 'healthy',
    description: 'Simple Storage Service',
    lastUpdated: '5 minutes ago'
  },
  {
    title: 'RDS Database',
    provider: 'aws',
    status: 'warning',
    description: 'Relational Database Service',
    lastUpdated: '15 minutes ago'
  },
  {
    title: 'Virtual Machines',
    provider: 'azure',
    status: 'healthy',
    description: 'Azure Virtual Machines',
    lastUpdated: '8 minutes ago'
  },
  {
    title: 'Azure Storage',
    provider: 'azure',
    status: 'healthy',
    description: 'Blob, File, and Queue Storage',
    lastUpdated: '10 minutes ago'
  },
  {
    title: 'Azure SQL',
    provider: 'azure',
    status: 'critical',
    description: 'Managed SQL Database',
    lastUpdated: '3 minutes ago'
  },
  {
    title: 'GKE',
    provider: 'gcp',
    status: 'healthy',
    description: 'Google Kubernetes Engine',
    lastUpdated: '7 minutes ago'
  },
  {
    title: 'Cloud Storage',
    provider: 'gcp',
    status: 'healthy',
    description: 'Google Cloud Storage',
    lastUpdated: '12 minutes ago'
  },
  {
    title: 'Cloud SQL',
    provider: 'gcp',
    status: 'warning',
    description: 'Google Cloud SQL',
    lastUpdated: '9 minutes ago'
  }
];
