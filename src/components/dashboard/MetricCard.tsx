
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  data?: Array<{ name: string; value: number }>;
  formatter?: (value: number) => string;
  color?: string;
  className?: string;
}

const MetricCard = ({
  title,
  value,
  change,
  data = [],
  formatter = (value) => `${value}`,
  color = 'hsl(var(--primary))',
  className,
}: MetricCardProps) => {
  return (
    <Card className={cn("metric-card", className)}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1">
        <div className="flex items-baseline">
          <p className="text-2xl font-bold">{value}</p>
          {change && (
            <span 
              className={cn(
                "ml-2 text-xs font-medium", 
                change.trend === 'up' ? 'text-status-healthy' : 'text-status-critical'
              )}
            >
              {change.trend === 'up' ? '+' : '-'}{Math.abs(change.value)}%
            </span>
          )}
        </div>
        
        {data.length > 0 && (
          <div className="h-[70px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  hide 
                />
                <YAxis 
                  hide 
                  domain={['dataMin - 5', 'dataMax + 5']} 
                />
                <Tooltip 
                  formatter={(value) => [formatter(Number(value)), title]}
                  contentStyle={{ 
                    background: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: '12px',
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color} 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 4, strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
