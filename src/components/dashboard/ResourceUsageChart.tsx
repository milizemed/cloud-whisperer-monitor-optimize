
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ResourceUsageChartProps {
  title: string;
  description?: string;
  data: any[];
  lines: Array<{
    name: string;
    dataKey: string;
    stroke: string;
    fill?: string;
  }>;
  yAxisFormatter?: (value: number) => string;
  className?: string;
  type?: 'line' | 'area';
  stacked?: boolean;
}

const ResourceUsageChart = ({
  title,
  description,
  data,
  lines,
  yAxisFormatter = (value) => `${value}%`,
  className,
  type = 'line',
  stacked = false,
}: ResourceUsageChartProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="resource-graph">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'line' ? (
              <LineChart
                data={data}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis 
                  tickFormatter={yAxisFormatter}
                  tick={{ fontSize: 12 }}
                  domain={[0, 'dataMax + 10']}
                />
                <Tooltip 
                  formatter={(value) => [`${value}`, '']}
                  contentStyle={{ 
                    background: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: '12px',
                  }}
                />
                <Legend />
                {lines.map((line) => (
                  <Line 
                    key={line.dataKey}
                    type="monotone" 
                    dataKey={line.dataKey} 
                    name={line.name}
                    stroke={line.stroke} 
                    strokeWidth={2}
                    activeDot={{ r: 6 }} 
                  />
                ))}
              </LineChart>
            ) : (
              <AreaChart
                data={data}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis 
                  tickFormatter={yAxisFormatter}
                  tick={{ fontSize: 12 }}
                  domain={[0, stacked ? 100 : 'dataMax + 10']}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                  contentStyle={{ 
                    background: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: '12px',
                  }}
                />
                <Legend />
                {lines.map((line) => (
                  <Area 
                    key={line.dataKey}
                    type="monotone" 
                    dataKey={line.dataKey} 
                    name={line.name}
                    stroke={line.stroke} 
                    fill={line.fill || line.stroke} 
                    fillOpacity={0.2}
                    stackId={stacked ? "1" : undefined}
                  />
                ))}
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceUsageChart;
