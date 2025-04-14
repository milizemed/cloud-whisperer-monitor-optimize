
// Types for cloud monitoring dashboard

export type CloudProvider = 'aws' | 'azure' | 'gcp';
export type ServiceStatus = 'healthy' | 'warning' | 'critical';
export type TrendDirection = 'up' | 'down';

export interface CloudService {
  title: string;
  provider: CloudProvider;
  status: ServiceStatus;
  description: string;
  lastUpdated: string;
}

export interface MetricChange {
  value: number;
  trend: TrendDirection;
}

export interface MetricDataPoint {
  name: string;
  value: number;
}

export interface MetricInfo {
  title: string;
  value: string;
  change: MetricChange;
  data: MetricDataPoint[];
}

export interface MetricsData {
  totalInstances: MetricInfo;
  totalStorage: MetricInfo;
  averageCpu: MetricInfo;
  costEstimate: MetricInfo;
}

export interface TimeSeriesDataPoint {
  time: string;
  [key: string]: any;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  service: 'compute' | 'storage' | 'database' | 'network' | 'security';
  provider: CloudProvider;
  isNew: boolean;
}

export interface ResourceInfo {
  id: string;
  name: string;
  type: string;
  region: string;
  status: ServiceStatus;
  provider: CloudProvider;
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
  lastUpdated: string;
}

export interface ComputeInstance extends ResourceInfo {
  instanceType: string;
  publicIp?: string;
  privateIp: string;
}

export interface StorageResource extends ResourceInfo {
  capacity: number;
  used: number;
  storageType: 'block' | 'object' | 'file';
  accessTier?: string;
}

export interface NetworkResource extends ResourceInfo {
  vpcId?: string;
  vnetId?: string;
  cidr?: string;
  connectionState?: 'connected' | 'disconnected' | 'pending';
  throughput?: {
    inbound: number;
    outbound: number;
  };
}

export interface SecurityResource extends ResourceInfo {
  scope: 'global' | 'regional' | 'resource';
  complianceStatus: 'compliant' | 'non-compliant' | 'not-applicable';
  findings: number;
  criticalFindings: number;
}
