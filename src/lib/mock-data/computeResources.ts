
import { ComputeInstance } from '../types';

export const computeInstances: ComputeInstance[] = [
  {
    id: 'i-1234abcd',
    name: 'web-server-prod-1',
    type: 'instance',
    region: 'us-west-2',
    status: 'healthy',
    provider: 'aws',
    instanceType: 't3.large',
    publicIp: '54.214.123.45',
    privateIp: '10.0.1.23',
    metrics: {
      cpu: 35,
      memory: 60,
      disk: 45,
      network: 22
    },
    lastUpdated: '2 minutes ago'
  },
  {
    id: 'i-5678efgh',
    name: 'app-server-prod-1',
    type: 'instance',
    region: 'us-west-2',
    status: 'healthy',
    provider: 'aws',
    instanceType: 'm5.xlarge',
    publicIp: '54.214.123.46',
    privateIp: '10.0.1.24',
    metrics: {
      cpu: 22,
      memory: 45,
      disk: 30,
      network: 18
    },
    lastUpdated: '3 minutes ago'
  },
  {
    id: 'i-9012ijkl',
    name: 'db-server-prod-1',
    type: 'instance',
    region: 'us-west-2',
    status: 'warning',
    provider: 'aws',
    instanceType: 'r5.2xlarge',
    privateIp: '10.0.1.25',
    metrics: {
      cpu: 78,
      memory: 85,
      disk: 60,
      network: 35
    },
    lastUpdated: '1 minute ago'
  },
  {
    id: 'vm-345678',
    name: 'web-server-azure-1',
    type: 'virtual machine',
    region: 'eastus',
    status: 'healthy',
    provider: 'azure',
    instanceType: 'Standard_D2s_v3',
    publicIp: '40.76.123.45',
    privateIp: '10.0.2.23',
    metrics: {
      cpu: 18,
      memory: 40,
      disk: 25,
      network: 15
    },
    lastUpdated: '5 minutes ago'
  },
  {
    id: 'vm-678901',
    name: 'app-server-azure-1',
    type: 'virtual machine',
    region: 'eastus',
    status: 'critical',
    provider: 'azure',
    instanceType: 'Standard_D4s_v3',
    publicIp: '40.76.123.46',
    privateIp: '10.0.2.24',
    metrics: {
      cpu: 95,
      memory: 90,
      disk: 85,
      network: 75
    },
    lastUpdated: '1 minute ago'
  },
  {
    id: 'gce-123456',
    name: 'web-server-gcp-1',
    type: 'instance',
    region: 'us-central1',
    status: 'healthy',
    provider: 'gcp',
    instanceType: 'n2-standard-2',
    publicIp: '34.68.123.45',
    privateIp: '10.0.3.23',
    metrics: {
      cpu: 25,
      memory: 50,
      disk: 35,
      network: 20
    },
    lastUpdated: '4 minutes ago'
  }
];
