
import { NetworkResource } from '@/lib/types';

export const networkResources: NetworkResource[] = [
  {
    id: 'vpc-1234a',
    name: 'Production VPC',
    type: 'vpc',
    region: 'us-east-1',
    status: 'healthy',
    provider: 'aws',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 85
    },
    lastUpdated: '5 minutes ago',
    vpcId: 'vpc-abcd1234',
    cidr: '10.0.0.0/16',
    throughput: {
      inbound: 250,
      outbound: 180
    }
  },
  {
    id: 'vpc-5678b',
    name: 'Staging VPC',
    type: 'vpc',
    region: 'us-east-1',
    status: 'healthy',
    provider: 'aws',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 45
    },
    lastUpdated: '10 minutes ago',
    vpcId: 'vpc-efgh5678',
    cidr: '10.1.0.0/16',
    throughput: {
      inbound: 120,
      outbound: 90
    }
  },
  {
    id: 'vpc-9012c',
    name: 'Development VPC',
    type: 'vpc',
    region: 'us-west-2',
    status: 'healthy',
    provider: 'aws',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 30
    },
    lastUpdated: '15 minutes ago',
    vpcId: 'vpc-ijkl9012',
    cidr: '10.2.0.0/16',
    throughput: {
      inbound: 70,
      outbound: 50
    }
  },
  {
    id: 'vnet-1234a',
    name: 'Production VNet',
    type: 'vnet',
    region: 'eastus',
    status: 'healthy',
    provider: 'azure',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 78
    },
    lastUpdated: '8 minutes ago',
    vnetId: 'vnet-abcd1234',
    cidr: '172.16.0.0/16',
    throughput: {
      inbound: 210,
      outbound: 170
    }
  },
  {
    id: 'vnet-5678b',
    name: 'Integration VNet',
    type: 'vnet',
    region: 'eastus2',
    status: 'warning',
    provider: 'azure',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 92
    },
    lastUpdated: '3 minutes ago',
    vnetId: 'vnet-efgh5678',
    cidr: '172.17.0.0/16',
    throughput: {
      inbound: 320,
      outbound: 290
    }
  },
  {
    id: 'lb-1234a',
    name: 'App-LB-1',
    type: 'loadbalancer',
    region: 'us-east-1',
    status: 'healthy',
    provider: 'aws',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 67
    },
    lastUpdated: '12 minutes ago',
    throughput: {
      inbound: 430,
      outbound: 410
    }
  },
  {
    id: 'lb-5678b',
    name: 'Net-LB-1',
    type: 'loadbalancer',
    region: 'us-west-2',
    status: 'healthy',
    provider: 'aws',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 72
    },
    lastUpdated: '7 minutes ago',
    throughput: {
      inbound: 520,
      outbound: 490
    }
  },
  {
    id: 'lb-9012c',
    name: 'Frontend-LB',
    type: 'loadbalancer',
    region: 'eastus',
    status: 'healthy',
    provider: 'azure',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 81
    },
    lastUpdated: '9 minutes ago',
    throughput: {
      inbound: 280,
      outbound: 260
    }
  },
  {
    id: 'lb-3456d',
    name: 'Backend-LB',
    type: 'loadbalancer',
    region: 'eastus2',
    status: 'healthy',
    provider: 'azure',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 76
    },
    lastUpdated: '6 minutes ago',
    throughput: {
      inbound: 340,
      outbound: 310
    }
  },
  {
    id: 'net-1234e',
    name: 'GCP-VPC-1',
    type: 'vpc',
    region: 'us-central1',
    status: 'healthy',
    provider: 'gcp',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 65
    },
    lastUpdated: '11 minutes ago',
    cidr: '192.168.0.0/16',
    throughput: {
      inbound: 190,
      outbound: 170
    }
  }
];
