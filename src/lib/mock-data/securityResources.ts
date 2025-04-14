
import { SecurityResource } from '@/lib/types';

export const securityResources: SecurityResource[] = [
  {
    id: 'sec-1234a',
    name: 'AWS Security Hub',
    type: 'security-hub',
    region: 'global',
    status: 'warning',
    provider: 'aws',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 0
    },
    lastUpdated: '15 minutes ago',
    scope: 'global',
    complianceStatus: 'non-compliant',
    findings: 23,
    criticalFindings: 3
  },
  {
    id: 'sec-5678b',
    name: 'GuardDuty',
    type: 'threat-detection',
    region: 'us-east-1',
    status: 'healthy',
    provider: 'aws',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 0
    },
    lastUpdated: '10 minutes ago',
    scope: 'regional',
    complianceStatus: 'compliant',
    findings: 5,
    criticalFindings: 0
  },
  {
    id: 'sec-9012c',
    name: 'AWS IAM Access Analyzer',
    type: 'access-analyzer',
    region: 'global',
    status: 'healthy',
    provider: 'aws',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 0
    },
    lastUpdated: '25 minutes ago',
    scope: 'global',
    complianceStatus: 'compliant',
    findings: 2,
    criticalFindings: 0
  },
  {
    id: 'sec-3456d',
    name: 'Azure Security Center',
    type: 'security-center',
    region: 'global',
    status: 'warning',
    provider: 'azure',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 0
    },
    lastUpdated: '5 minutes ago',
    scope: 'global',
    complianceStatus: 'non-compliant',
    findings: 18,
    criticalFindings: 2
  },
  {
    id: 'sec-7890e',
    name: 'Azure Policy',
    type: 'policy',
    region: 'global',
    status: 'healthy',
    provider: 'azure',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 0
    },
    lastUpdated: '12 minutes ago',
    scope: 'global',
    complianceStatus: 'compliant',
    findings: 7,
    criticalFindings: 0
  },
  {
    id: 'sec-1234f',
    name: 'Azure Key Vault',
    type: 'key-vault',
    region: 'eastus',
    status: 'healthy',
    provider: 'azure',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 0
    },
    lastUpdated: '30 minutes ago',
    scope: 'resource',
    complianceStatus: 'compliant',
    findings: 0,
    criticalFindings: 0
  },
  {
    id: 'sec-5678g',
    name: 'GCP Security Command Center',
    type: 'security-center',
    region: 'global',
    status: 'warning',
    provider: 'gcp',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 0
    },
    lastUpdated: '8 minutes ago',
    scope: 'global',
    complianceStatus: 'non-compliant',
    findings: 14,
    criticalFindings: 1
  },
  {
    id: 'sec-9012h',
    name: 'GCP Identity-Aware Proxy',
    type: 'access-control',
    region: 'global',
    status: 'healthy',
    provider: 'gcp',
    metrics: {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 0
    },
    lastUpdated: '20 minutes ago',
    scope: 'global',
    complianceStatus: 'compliant',
    findings: 3,
    criticalFindings: 0
  }
];
