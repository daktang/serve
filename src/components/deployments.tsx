'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cloud,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Cpu,
  Database,
  Globe,
  Server,
  Settings,
  TrendingUp
} from 'lucide-react';

const deployments = [
  {
    id: 1,
    name: 'ResNet-50 Production',
    model: 'ResNet-50 v2.1.0',
    status: 'running',
    health: 'healthy',
    instances: 3,
    endpoint: 'https://api.example.com/v1/resnet50',
    traffic: 85,
    latency: 94,
    successRate: 99.8,
    region: 'us-east-1',
    lastDeployed: '2024-01-15 14:30',
  },
  {
    id: 2,
    name: 'BERT Staging',
    model: 'BERT-Large v1.3.2',
    status: 'updating',
    health: 'warning',
    instances: 2,
    endpoint: 'https://staging.example.com/v1/bert',
    traffic: 23,
    latency: 156,
    successRate: 98.2,
    region: 'us-west-2',
    lastDeployed: '2024-01-14 09:15',
  },
  {
    id: 3,
    name: 'YOLOv8 Dev',
    model: 'YOLOv8 v3.0.1',
    status: 'stopped',
    health: 'error',
    instances: 0,
    endpoint: 'https://dev.example.com/v1/yolo',
    traffic: 0,
    latency: 0,
    successRate: 0,
    region: 'eu-west-1',
    lastDeployed: '2024-01-10 16:45',
  },
];

export function Deployments() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'default';
      case 'updating':
        return 'secondary';
      case 'stopped':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Deployments</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage your model deployments across environments
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Cloud className="h-4 w-4" />
          New Deployment
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deployments</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deployments.filter(d => d.status === 'running').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {deployments.filter(d => d.health === 'healthy').length} healthy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Instances</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deployments.reduce((sum, d) => sum + d.instances, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all deployments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(deployments.reduce((sum, d) => sum + d.latency, 0) / deployments.length)}ms
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-12ms</span> from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.1%</span> from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Deployments</TabsTrigger>
          <TabsTrigger value="running">Running</TabsTrigger>
          <TabsTrigger value="updating">Updating</TabsTrigger>
          <TabsTrigger value="stopped">Stopped</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {deployments.map((deployment) => (
            <Card key={deployment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Cloud className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{deployment.name}</CardTitle>
                      <CardDescription>
                        {deployment.model} • {deployment.region}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getHealthIcon(deployment.health)}
                    <Badge variant={getStatusColor(deployment.status)}>
                      {deployment.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium mb-2">
                        <Globe className="h-4 w-4" />
                        Endpoint
                      </div>
                      <div className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
                        {deployment.endpoint}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Instances</div>
                      <div className="text-2xl font-bold">{deployment.instances}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Traffic Load</span>
                        <span>{deployment.traffic}%</span>
                      </div>
                      <Progress value={deployment.traffic} className="h-2" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Latency</div>
                      <div className="text-2xl font-bold">{deployment.latency}ms</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Success Rate</span>
                        <span>{deployment.successRate}%</span>
                      </div>
                      <Progress value={deployment.successRate} className="h-2" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Last Deployed</div>
                      <div className="text-sm text-muted-foreground">{deployment.lastDeployed}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6 pt-4 border-t">
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline">
                    <Activity className="h-4 w-4 mr-2" />
                    View Logs
                  </Button>
                  <Button size="sm" variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    Scale
                  </Button>
                  {deployment.status === 'running' && (
                    <Button size="sm" variant="outline" className="text-red-600">
                      Stop
                    </Button>
                  )}
                  {deployment.status === 'stopped' && (
                    <Button size="sm" variant="default">
                      Start
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}