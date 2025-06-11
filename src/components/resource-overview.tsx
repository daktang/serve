'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { 
  Cpu,
  MemoryStick as Memory,
  HardDrive,
  Zap,
  TrendingUp,
  TrendingDown,
  Activity,
  Server,
  Database
} from 'lucide-react';

const resourceData = [
  { time: '00:00', cpu: 45, memory: 62, gpu: 78, storage: 34 },
  { time: '04:00', cpu: 32, memory: 58, gpu: 65, storage: 35 },
  { time: '08:00', cpu: 68, memory: 74, gpu: 89, storage: 36 },
  { time: '12:00', cpu: 82, memory: 85, gpu: 95, storage: 38 },
  { time: '16:00', cpu: 75, memory: 79, gpu: 87, storage: 39 },
  { time: '20:00', cpu: 54, memory: 68, gpu: 72, storage: 40 },
];

const podData = [
  { name: 'resnet50-pod-1', cpu: 68, memory: 74, gpu: 89, status: 'Running' },
  { name: 'bert-pod-1', cpu: 45, memory: 62, gpu: 0, status: 'Running' },
  { name: 'yolo-pod-1', cpu: 82, memory: 85, gpu: 95, status: 'Pending' },
  { name: 'gpt-pod-1', cpu: 32, memory: 58, gpu: 65, status: 'Failed' },
];

interface ResourceOverviewProps {
  currentProject: string;
}

export function ResourceOverview({ currentProject }: ResourceOverviewProps) {
  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600 dark:text-red-400';
    if (percentage >= 75) return 'text-amber-600 dark:text-amber-400';
    return 'text-emerald-600 dark:text-emerald-400';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Resource Overview</h1>
        <p className="text-muted-foreground mt-2">
          프로젝트 리소스 사용량 모니터링 - Project: <span className="font-medium text-primary">{currentProject}</span>
        </p>
      </div>

      {/* Resource Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">CPU</p>
                  <p className="text-2xl font-bold text-foreground">68%</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Request</span>
                <span className="text-foreground">85 / 100 cores</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Limit</span>
                <span className="text-foreground">100 / 120 cores</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Memory className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Memory</p>
                  <p className="text-2xl font-bold text-foreground">74%</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Request</span>
                <span className="text-foreground">120 / 150 GB</span>
              </div>
              <Progress value={80} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Limit</span>
                <span className="text-foreground">150 / 200 GB</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">GPU</p>
                  <p className="text-2xl font-bold text-foreground">89%</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Request</span>
                <span className="text-foreground">6 / 8 units</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Limit</span>
                <span className="text-foreground">8 / 10 units</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <HardDrive className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Storage</p>
                  <p className="text-2xl font-bold text-foreground">36%</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Request</span>
                <span className="text-foreground">450 / 1000 GB</span>
              </div>
              <Progress value={45} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Limit</span>
                <span className="text-foreground">1000 / 2000 GB</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Usage Table */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">실시간 사용량 (Pod 단위)</CardTitle>
          <CardDescription className="text-muted-foreground">
            각 Pod의 실시간 리소스 사용량
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Pod Name</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">CPU</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Memory</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">GPU</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {podData.map((pod, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <Server className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-foreground">{pod.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(pod.cpu)}`}
                            style={{ width: `${pod.cpu}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getUsageColor(pod.cpu)}`}>
                          {pod.cpu}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(pod.memory)}`}
                            style={{ width: `${pod.memory}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getUsageColor(pod.memory)}`}>
                          {pod.memory}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(pod.gpu)}`}
                            style={{ width: `${pod.gpu}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getUsageColor(pod.gpu)}`}>
                          {pod.gpu}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={getStatusColor(pod.status)}>
                        {pod.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">Resource Trends</CardTitle>
            <CardDescription className="text-muted-foreground">
              24시간 리소스 사용량 추이
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={resourceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Line type="monotone" dataKey="cpu" stroke="hsl(var(--primary))" strokeWidth={2} name="CPU %" />
                  <Line type="monotone" dataKey="memory" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Memory %" />
                  <Line type="monotone" dataKey="gpu" stroke="hsl(var(--chart-3))" strokeWidth={2} name="GPU %" />
                  <Line type="monotone" dataKey="storage" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Storage %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">Resource Distribution</CardTitle>
            <CardDescription className="text-muted-foreground">
              현재 리소스 사용량 분포
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={resourceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Area type="monotone" dataKey="cpu" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="memory" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="gpu" stackId="1" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}