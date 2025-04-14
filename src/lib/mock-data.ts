
// Mock data for cloud monitoring dashboard

// Generate timestamps for the past 24 hours, every hour
const generateTimepoints = (hours: number = 24, interval: number = 1) => {
  const points = [];
  for (let i = hours; i >= 0; i -= interval) {
    const date = new Date();
    date.setHours(date.getHours() - i);
    points.push(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }
  return points;
};

// Generate random values within a range
const generateRandomValues = (
  count: number, 
  min: number = 0, 
  max: number = 100, 
  trend?: 'up' | 'down' | 'stable'
) => {
  const values = [];
  let lastValue = Math.random() * (max - min) + min;
  
  for (let i = 0; i < count; i++) {
    if (trend === 'up') {
      lastValue = Math.min(max, lastValue + (Math.random() * 10));
    } else if (trend === 'down') {
      lastValue = Math.max(min, lastValue - (Math.random() * 10));
    } else if (trend === 'stable') {
      lastValue = lastValue + (Math.random() * 6) - 3;
      lastValue = Math.max(min, Math.min(max, lastValue));
    } else {
      lastValue = Math.random() * (max - min) + min;
    }
    
    values.push(Math.round(lastValue * 10) / 10);
  }
  
  return values;
};

// Generate time series data for charts
export const generateTimeSeriesData = (
  hours: number = 24, 
  metrics: string[] = ['cpu'], 
  trend?: 'up' | 'down' | 'stable'
) => {
  const timePoints = generateTimepoints(hours);
  const values: Record<string, number[]> = {};
  
  metrics.forEach(metric => {
    values[metric] = generateRandomValues(timePoints.length, 0, 100, trend);
  });
  
  return timePoints.map((time, index) => {
    const dataPoint: Record<string, any> = { time };
    metrics.forEach(metric => {
      dataPoint[metric] = values[metric][index];
    });
    return dataPoint;
  });
};

// Generate random alerts
export const generateAlerts = (count: number = 10) => {
  const severities: ('critical' | 'warning' | 'info')[] = ['critical', 'warning', 'info'];
  const services: ('compute' | 'storage' | 'database' | 'network' | 'security')[] = [
    'compute', 'storage', 'database', 'network', 'security'
  ];
  const providers: ('aws' | 'azure')[] = ['aws', 'azure'];
  
  const alerts = [];
  
  // Sample alert messages
  const alertMessages = {
    compute: [
      'High CPU utilization detected on instance i-1234abcd',
      'EC2 instance t2.micro is approaching memory limits',
      'VM Scale Set autoscaling triggered due to load increase',
      'Container instance is experiencing high disk I/O',
      'Azure VM health check failing in region eastus2'
    ],
    storage: [
      'S3 bucket approaching storage limits',
      'Azure Blob storage experiencing increased latency',
      'EBS volume performance degraded',
      'Unusual access pattern detected for storage account',
      'Backup job failed for storage volume vol-1234abcd'
    ],
    database: [
      'RDS instance experiencing high connection count',
      'Azure SQL DB approaching storage limit',
      'DynamoDB read capacity exceeded',
      'Database replica lag exceeding threshold',
      'Cosmos DB throughput throttling detected'
    ],
    network: [
      'VPC NAT gateway reaching bandwidth limits',
      'Azure Load Balancer reporting unhealthy backends',
      'Network ACL blocking legitimate traffic',
      'Unusual traffic pattern detected on subnet',
      'VPN connection flapping between regions'
    ],
    security: [
      'IAM role with excessive permissions detected',
      'Unusual API calls from unauthorized IP address',
      'Key Vault access failures from production services',
      'Security group exposing sensitive ports to public',
      'DDOS protection engaged on public endpoint'
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

// Cloud service status data
export const cloudServices = [
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
  }
];

// Metric data for cards
export const metrics = {
  totalInstances: {
    title: 'Total Instances',
    value: '164',
    change: { value: 12, trend: 'up' as const },
    data: [
      { name: '00:00', value: 130 },
      { name: '04:00', value: 132 },
      { name: '08:00', value: 137 },
      { name: '12:00', value: 145 },
      { name: '16:00', value: 160 },
      { name: '20:00', value: 164 }
    ]
  },
  totalStorage: {
    title: 'Storage Usage',
    value: '8.7 TB',
    change: { value: 5, trend: 'up' as const },
    data: [
      { name: '00:00', value: 7.6 },
      { name: '04:00', value: 7.8 },
      { name: '08:00', value: 8.1 },
      { name: '12:00', value: 8.3 },
      { name: '16:00', value: 8.5 },
      { name: '20:00', value: 8.7 }
    ]
  },
  averageCpu: {
    title: 'Avg. CPU Usage',
    value: '42%',
    change: { value: 7, trend: 'down' as const },
    data: [
      { name: '00:00', value: 58 },
      { name: '04:00', value: 54 },
      { name: '08:00', value: 52 },
      { name: '12:00', value: 47 },
      { name: '16:00', value: 45 },
      { name: '20:00', value: 42 }
    ]
  },
  costEstimate: {
    title: 'Monthly Cost Est.',
    value: '$12,845',
    change: { value: 3, trend: 'up' as const },
    data: [
      { name: '00:00', value: 12100 },
      { name: '04:00', value: 12300 },
      { name: '08:00', value: 12400 },
      { name: '12:00', value: 12500 },
      { name: '16:00', value: 12700 },
      { name: '20:00', value: 12845 }
    ]
  }
};

// Resource usage data for line charts
export const resourceUsageData = generateTimeSeriesData(24, ['awsCpu', 'azureCpu']);
export const networkUsageData = generateTimeSeriesData(24, ['ingress', 'egress']);
export const storageUsageData = generateTimeSeriesData(24, ['s3', 'ebs', 'azureBlob'], 'up');

// Generate alerts
export const alertsData = generateAlerts(15);
