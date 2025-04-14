
import { StorageResource } from '../types';

export const storageResources: StorageResource[] = [
  {
    id: 'bucket-1234abcd',
    name: 'prod-assets-bucket',
    type: 'bucket',
    region: 'us-west-2',
    status: 'healthy',
    provider: 'aws',
    capacity: 1000,
    used: 650,
    storageType: 'object',
    accessTier: 'Standard',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 65,
      network: 45
    },
    lastUpdated: '10 minutes ago'
  },
  {
    id: 'vol-5678efgh',
    name: 'app-server-vol',
    type: 'volume',
    region: 'us-west-2',
    status: 'healthy',
    provider: 'aws',
    capacity: 500,
    used: 320,
    storageType: 'block',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 64,
      network: 0
    },
    lastUpdated: '12 minutes ago'
  },
  {
    id: 'blob-345678',
    name: 'azure-media-container',
    type: 'container',
    region: 'eastus',
    status: 'healthy',
    provider: 'azure',
    capacity: 2000,
    used: 750,
    storageType: 'object',
    accessTier: 'Hot',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 37.5,
      network: 25
    },
    lastUpdated: '8 minutes ago'
  },
  {
    id: 'disk-678901',
    name: 'azure-app-disk',
    type: 'managed disk',
    region: 'eastus',
    status: 'warning',
    provider: 'azure',
    capacity: 256,
    used: 230,
    storageType: 'block',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 90,
      network: 0
    },
    lastUpdated: '5 minutes ago'
  },
  {
    id: 'gcs-123456',
    name: 'gcp-data-bucket',
    type: 'bucket',
    region: 'us-central1',
    status: 'healthy',
    provider: 'gcp',
    capacity: 5000,
    used: 1200,
    storageType: 'object',
    accessTier: 'Standard',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 24,
      network: 15
    },
    lastUpdated: '15 minutes ago'
  }
];
