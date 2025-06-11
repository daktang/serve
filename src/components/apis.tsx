'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Zap,
  Key,
  Code,
  Play,
  Copy,
  FileText,
  Globe,
  Lock,
  BarChart3,
  Clock
} from 'lucide-react';

const apiEndpoints = [
  {
    id: 1,
    name: 'Image Classification',
    method: 'POST',
    endpoint: '/v1/models/resnet50/predict',
    model: 'ResNet-50',
    description: 'Classify images using the ResNet-50 model',
    status: 'active',
    requestsToday: 1247,
    avgLatency: 94,
    lastUsed: '2 minutes ago',
    project: 'ml-platform',
  },
  {
    id: 2,
    name: 'Text Analysis',
    method: 'POST',
    endpoint: '/v1/models/bert/analyze',
    model: 'BERT-Large',
    description: 'Analyze sentiment and extract entities from text',
    status: 'active',
    requestsToday: 856,
    avgLatency: 156,
    lastUsed: '5 minutes ago',
    project: 'ml-platform',
  },
  {
    id: 3,
    name: 'Object Detection',
    method: 'POST',
    endpoint: '/v1/models/yolo/detect',
    model: 'YOLOv8',
    description: 'Detect and locate objects in images',
    status: 'maintenance',
    requestsToday: 0,
    avgLatency: 0,
    lastUsed: '2 hours ago',
    project: 'computer-vision',
  },
];

const sampleRequest = `{
  "image": "base64_encoded_image_data",
  "confidence_threshold": 0.8,
  "max_results": 5
}`;

const sampleResponse = `{
  "predictions": [
    {
      "class": "golden_retriever",
      "confidence": 0.9234,
      "bbox": [120, 80, 340, 280]
    },
    {
      "class": "tennis_ball",
      "confidence": 0.8567,
      "bbox": [200, 150, 250, 200]
    }
  ],
  "processing_time": 94,
  "model_version": "v2.1.0"
}`;

interface APIsProps {
  currentProject: string;
}

export function APIs({ currentProject }: APIsProps) {
  // Filter APIs by current project
  const projectAPIs = apiEndpoints.filter(api => api.project === currentProject);

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'POST':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'PUT':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'DELETE':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'maintenance':
        return 'secondary';
      case 'deprecated':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage API endpoints, authentication, and documentation - Project: <span className="font-medium">{currentProject}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </Button>
          <Button className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Create Endpoint
          </Button>
        </div>
      </div>

      {/* API Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Endpoints</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projectAPIs.filter(api => api.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {projectAPIs.length} total endpoints
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requests Today</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projectAPIs.reduce((sum, api) => sum + api.requestsToday, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125ms</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-8ms</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.6%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.2%</span> uptime
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="endpoints" className="space-y-4">
        <TabsList>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="testing">API Testing</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          {projectAPIs.map((api) => (
            <Card key={api.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{api.name}</CardTitle>
                      <CardDescription>{api.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(api.status)}>
                    {api.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className={getMethodColor(api.method)}>
                      {api.method}
                    </Badge>
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                      {api.endpoint}
                    </code>
                    <Button size="sm" variant="ghost">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Model</div>
                      <div className="text-muted-foreground">{api.model}</div>
                    </div>
                    <div>
                      <div className="font-medium">Requests Today</div>
                      <div className="text-muted-foreground">{api.requestsToday.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="font-medium">Avg Latency</div>
                      <div className="text-muted-foreground">{api.avgLatency}ms</div>
                    </div>
                    <div>
                      <div className="font-medium">Last Used</div>
                      <div className="text-muted-foreground">{api.lastUsed}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      Test
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Docs
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Testing Console</CardTitle>
              <CardDescription>
                Test your API endpoints with custom requests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Endpoint</label>
                    <Input
                      placeholder="/v1/models/resnet50/predict"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Request Body</label>
                    <Textarea
                      placeholder={sampleRequest}
                      className="mt-1 font-mono text-sm"
                      rows={12}
                    />
                  </div>
                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Send Request
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Response</label>
                    <div className="mt-1 bg-muted p-4 rounded-lg">
                      <pre className="text-sm font-mono whitespace-pre-wrap">
                        {sampleResponse}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Interactive documentation for your API endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Getting Started</h3>
                  <p className="text-muted-foreground mb-4">
                    Welcome to the MLOps AI Serving API. This API provides access to our trained machine learning models.
                  </p>
                  <div className="bg-muted p-3 rounded font-mono text-sm">
                    Base URL: https://api.example.com
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Authentication</h3>
                  <p className="text-muted-foreground mb-4">
                    All API requests require authentication using an API key in the Authorization header.
                  </p>
                  <div className="bg-muted p-3 rounded font-mono text-sm">
                    Authorization: Bearer YOUR_API_KEY
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Rate Limits</h3>
                  <p className="text-muted-foreground">
                    API requests are limited to 1000 requests per hour per API key.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Key Management</CardTitle>
              <CardDescription>
                Create and manage API keys for accessing your models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Generate New API Key
                </Button>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Production Key</div>
                      <div className="text-sm text-muted-foreground">
                        sk-...a8f2 • Created Jan 15, 2024
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Active</Badge>
                      <Button size="sm" variant="outline">
                        <Lock className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Development Key</div>
                      <div className="text-sm text-muted-foreground">
                        sk-...b9c3 • Created Jan 10, 2024
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Limited</Badge>
                      <Button size="sm" variant="outline">
                        <Lock className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}