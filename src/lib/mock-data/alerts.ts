
import { Alert } from '../types';

// Generate random alerts
export const generateAlerts = (count: number = 10): Alert[] => {
  const severities: ('critical' | 'warning' | 'info')[] = ['critical', 'warning', 'info'];
  const services: ('compute' | 'storage' | 'database' | 'network' | 'security')[] = [
    'compute', 'storage', 'database', 'network', 'security'
  ];
  const providers: ('aws' | 'azure' | 'gcp')[] = ['aws', 'azure', 'gcp'];
  
  const alerts: Alert[] = [];
  
  // Sample alert messages
  const alertMessages: Record<string, string[]> = {
    compute: [
      'High CPU utilization detected on instance i-1234abcd',
      'EC2 instance t2.micro is approaching memory limits',
      'VM Scale Set autoscaling triggered due to load increase',
      'Container instance is experiencing high disk I/O',
      'Azure VM health check failing in region eastus2',
      'GCP VM instance high network latency detected'
    ],
    storage: [
      'S3 bucket approaching storage limits',
      'Azure Blob storage experiencing increased latency',
      'EBS volume performance degraded',
      'Unusual access pattern detected for storage account',
      'Backup job failed for storage volume vol-1234abcd',
      'GCS bucket access logs showing unauthorized attempts'
    ],
    database: [
      'RDS instance experiencing high connection count',
      'Azure SQL DB approaching storage limit',
      'DynamoDB read capacity exceeded',
      'Database replica lag exceeding threshold',
      'Cosmos DB throughput throttling detected',
      'Cloud SQL instance failing health checks'
    ],
    network: [
      'VPC NAT gateway reaching bandwidth limits',
      'Azure Load Balancer reporting unhealthy backends',
      'Network ACL blocking legitimate traffic',
      'Unusual traffic pattern detected on subnet',
      'VPN connection flapping between regions',
      'Cloud CDN cache hit ratio below threshold'
    ],
    security: [
      'IAM role with excessive permissions detected',
      'Unusual API calls from unauthorized IP address',
      'Key Vault access failures from production services',
      'Security group exposing sensitive ports to public',
      'DDOS protection engaged on public endpoint',
      'Security Command Center identified critical vulnerability'
    ]
  };
  
  // Generate timestamps within the last 24 hours
  const generateTimestamp = () => {
    const now = new Date();
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    now.setHours(now.getHours() - hoursAgo);
    now.setMinutes(now.getMinutes() - minutesAgo);
    
    // Format timestamp
    if (hoursAgo === 0) {
      return `${minutesAgo}m ago`;
    } else {
      return `${hoursAgo}h ${minutesAgo}m ago`;
    }
  };
  
  for (let i = 0; i < count; i++) {
    const service = services[Math.floor(Math.random() * services.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const provider = providers[Math.floor(Math.random() * providers.length)];
    const messageOptions = alertMessages[service];
    const message = messageOptions[Math.floor(Math.random() * messageOptions.length)];
    
    alerts.push({
      id: `alert-${i}`,
      severity,
      message,
      timestamp: generateTimestamp(),
      service,
      provider,
      isNew: i < 3 // Mark the first 3 as new
    });
  }
  
  return alerts;
};

// Generate alerts
export const alertsData = generateAlerts(15);
