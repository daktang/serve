'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Cpu,
  Database,
  Globe,
  TrendingDown,
  TrendingUp,
  Zap
} from 'lucide-react';

const performanceData = [
  { time: '00:00', requests: 1200, latency: 85, errors: 2 },
  { time: '04:00', requests: 800, latency: 92, errors: 1 },
  { time: '08:00', requests: 2400, latency: 78, errors: 3 },
  { time: '12:00', requests: 3200, latency: 94, errors: 5 },
  { time: '16:00', requests: 2800, latency: 102, errors: 2 },
  { time: '20:00', requests: 1600, latency: 88, errors: 1 },
];

const resourceData = [
  { time: '00:00', cpu: 45, memory: 62, disk: 78 },
  { time: '04:00', cpu: 32, memory: 58, disk: 78 },
  { time: '08:00', cpu: 68, memory: 74, disk: 79 },
  { time: '12:00', cpu: 82, memory: 85, disk: 80 },
  { time: '16:00', cpu: 75, memory: 79, disk: 81 },
  { time: '20:00', cpu: 54, memory: 68, disk: 81 },
];

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'High CPU Usage',
    message: 'Server us-east-1a CPU usage above 85% for 5 minutes',
    timestamp: '2 minutes ago',
    service: 'ResNet-50 Production',
  },
  {
    id: 2,
    type: 'error',
    title: 'Model Deployment Failed',
    message: 'YOLOv8 deployment failed due to insufficient memory',
    timestamp: '15 minutes ago',
    service: 'YOLOv8 Staging',
  },
  {
    id: 3,
    type: 'info',
    title: 'Scaling Event',
    message: 'Auto-scaled BERT service from 2 to 3 instances',
    timestamp: '1 hour ago',
    service: 'BERT Production',
  },
];

const logs = [
  {
    id: 1,
    timestamp: '2024-01-15 14:32:15',
    level: 'INFO',
    service: 'ResNet-50',
    message: 'Prediction request completed successfully',
    duration: '94ms',
  },
  {
    id: 2,
    timestamp: '2024-01-15 14:32:10',
    level: 'WARN',
    service: 'BERT-Large',
    message: 'High memory usage detected',
    duration: '156ms',
  },
  {
    id: 3,
    timestamp: '2024-01-15 14:32:05',
    level: 'ERROR',
    service: 'YOLOv8',
    message: 'Model inference failed - timeout',
    duration: '5000ms',
  },
];

export function Monitoring() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'WARN':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'INFO':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Monitoring</h1>
          <p className="text-muted-foreground mt-2">
            Real-time monitoring of your AI services and infrastructure
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Alerts ({alerts.filter(a => a.type === 'error' || a.type === 'warning').length})
          </Button>
        </div>
      </div>

      {/* Health Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="text-xl font-bold">Healthy</div>
            </div>
            <p className="text-xs text-muted-foreground">
              All services operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.97%</div>
            <p className="text-xs text-muted-foreground">
              30-day uptime
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {alerts.filter(a => a.type === 'warning').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {alerts.filter(a => a.type === 'error').length} critical
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91ms</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 text-green-600 mr-1" />
              -12ms from last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="resources">Resource Usage</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Volume</CardTitle>
                <CardDescription>
                  Incoming requests over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="requests" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Latency</CardTitle>
                <CardDescription>
                  Average response time trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="latency" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
              <CardDescription>
                CPU, Memory, and Disk usage across your infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={resourceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cpu" stroke="#ff7c7c" strokeWidth={2} name="CPU %" />
                    <Line type="monotone" dataKey="memory" stroke="#8884d8" strokeWidth={2} name="Memory %" />
                    <Line type="monotone" dataKey="disk" stroke="#82ca9d" strokeWidth={2} name="Disk %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{alert.title}</h3>
                        <div className="text-sm text-muted-foreground">{alert.timestamp}</div>
                      </div>
                      <p className="text-muted-foreground mb-2">{alert.message}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{alert.service}</Badge>
                        <Button size="sm" variant="outline">
                          Acknowledge
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>
                Real-time logs from your AI services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground font-mono">
                        {log.timestamp}
                      </div>
                      <Badge variant="outline" className={getLogLevelColor(log.level)}>
                        {log.level}
                      </Badge>
                      <div className="text-sm font-medium">{log.service}</div>
                      <div className="flex-1 text-sm">{log.message}</div>
                      <div className="text-xs text-muted-foreground">{log.duration}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}