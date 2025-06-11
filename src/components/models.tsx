'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Brain, Plus, Search, Filter, Play, Pause, MoreHorizontal, Eye, Settings, Trash2, FileText, CheckCircle, AlertTriangle, Clock, XCircle, ExternalLink, BookTemplate as Template } from 'lucide-react';
import { useState } from 'react';

const models = [
  {
    id: 1,
    name: 'resnet50-classifier',
    status: 'Ready',
    age: '5m',
    scope: 'Project',
    runtime: 'pytorch',
    version: 'v0.8.0',
    image: 'pytorch/torchserve:0.8.0-gpu',
    url: 'https://resnet50-classifier.example.com/v1/models/resnet50:predict',
    project: 'ml-platform',
  },
  {
    id: 2,
    name: 'bert-sentiment-analysis',
    status: 'Ready',
    age: '2h',
    scope: 'Global',
    runtime: 'huggingface',
    version: 'v0.10.0',
    image: 'huggingface/transformers:latest',
    url: 'https://bert-sentiment.example.com/v1/models/bert:predict',
    project: 'ml-platform',
  },
  {
    id: 3,
    name: 'yolo-object-detection',
    status: 'InProgress',
    age: '30s',
    scope: 'Private',
    runtime: 'triton',
    version: 'v2.25.0',
    image: 'nvcr.io/nvidia/tritonserver:22.07-py3',
    url: null,
    project: 'computer-vision',
  },
  {
    id: 4,
    name: 'gpt-text-generation',
    status: 'Failed',
    age: '1d',
    scope: 'Project',
    runtime: 'vllm',
    version: 'v0.2.0',
    image: 'vllm/vllm-openai:latest',
    url: null,
    project: 'nlp-services',
  },
];

interface ModelsProps {
  currentProject: string;
}

export function Models({ currentProject }: ModelsProps) {
  const [isNewModelOpen, setIsNewModelOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'Private' | 'Project' | 'Global'>('Project');

  // Filter models by current project
  const projectModels = models.filter(model => model.project === currentProject);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ready':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'InProgress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Stopped':
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'default';
      case 'InProgress':
        return 'secondary';
      case 'Failed':
        return 'destructive';
      case 'Stopped':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'Global':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Project':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Private':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getRuntimeColor = (runtime: string) => {
    switch (runtime) {
      case 'pytorch':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'huggingface':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'triton':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'vllm':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'custom':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const canStart = (status: string) => status === 'Stopped' || status === 'Failed';
  const canStop = (status: string) => status === 'Ready' || status === 'InProgress';

  const handleModelClick = (modelId: number) => {
    console.log(`Navigate to model details for ID: ${modelId}`);
  };

  const renderModelTable = (services: typeof projectModels) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Scope</TableHead>
          <TableHead>Runtime</TableHead>
          <TableHead>Version</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                {getStatusIcon(service.status)}
                <Badge variant={getStatusColor(service.status)}>
                  {service.status}
                </Badge>
              </div>
            </TableCell>
            <TableCell>
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-left justify-start"
                onClick={() => handleModelClick(service.id)}
              >
                {service.name}
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </TableCell>
            <TableCell>{service.age}</TableCell>
            <TableCell>
              <Badge variant="outline" className={getScopeColor(service.scope)}>
                {service.scope}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className={getRuntimeColor(service.runtime)}>
                {service.runtime}
              </Badge>
            </TableCell>
            <TableCell>
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                {service.version}
              </code>
            </TableCell>
            <TableCell>
              <code className="text-xs bg-muted px-1 py-0.5 rounded max-w-[200px] block truncate">
                {service.image}
              </code>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                {canStart(service.status) && (
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Play className="h-3 w-3" />
                  </Button>
                )}
                {canStop(service.status) && (
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Pause className="h-3 w-3" />
                  </Button>
                )}
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <FileText className="h-3 w-3" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleModelClick(service.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Config
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderNewModelForm = () => {
    if (selectedType === 'Global') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="modelName">Model Name</Label>
              <Input 
                id="modelName"
                placeholder="my-model" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="runtime">Runtime</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select runtime" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pytorch">PyTorch</SelectItem>
                  <SelectItem value="huggingface">HuggingFace</SelectItem>
                  <SelectItem value="triton">Triton Server</SelectItem>
                  <SelectItem value="vllm">vLLM</SelectItem>
                  <SelectItem value="custom">Custom Runtime</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Container Image</Label>
            <Input 
              id="image"
              placeholder="pytorch/torchserve:0.8.0-gpu" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="modelUri">Model URI</Label>
            <Input 
              id="modelUri"
              placeholder="gs://my-bucket/models/resnet50/" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minReplicas">Min Replicas</Label>
              <Input 
                id="minReplicas"
                type="number"
                placeholder="1"
                defaultValue="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxReplicas">Max Replicas</Label>
              <Input 
                id="maxReplicas"
                type="number"
                placeholder="5"
                defaultValue="5"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpuRequest">CPU Request</Label>
              <Input 
                id="cpuRequest"
                placeholder="100m"
                defaultValue="100m"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memoryRequest">Memory Request</Label>
              <Input 
                id="memoryRequest"
                placeholder="512Mi"
                defaultValue="512Mi"
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Template className="h-4 w-4" />
              <span className="font-medium">Template Selection</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Choose from saved templates for {selectedType.toLowerCase()} models
            </p>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pytorch-template">PyTorch Classification Template</SelectItem>
                <SelectItem value="huggingface-template">HuggingFace NLP Template</SelectItem>
                <SelectItem value="custom-template">Custom Model Template</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="templateModelName">Model Name</Label>
            <Input 
              id="templateModelName"
              placeholder="Enter model name" 
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Models</h1>
          <p className="text-muted-foreground mt-2">
            AI 모델 관리 - Project: <span className="font-medium">{currentProject}</span>
          </p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setIsNewModelOpen(true)}
        >
          <Plus className="h-4 w-4" />
          New Model
        </Button>
      </div>

      {/* New Model Modal */}
      <Dialog open={isNewModelOpen} onOpenChange={setIsNewModelOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Model Deployment</DialogTitle>
            <DialogDescription>
              새로운 AI 모델을 배포합니다
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={selectedType} onValueChange={(value: 'Private' | 'Project' | 'Global') => setSelectedType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Project">Project</SelectItem>
                  <SelectItem value="Global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {renderNewModelForm()}
            
            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsNewModelOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={() => {
                  setIsNewModelOpen(false);
                }}
              >
                Deploy Model
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Models</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectModels.length}</div>
            <p className="text-xs text-muted-foreground">
              {projectModels.filter(s => s.status === 'Ready').length} ready
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {projectModels.filter(s => s.status === 'Ready').length}
            </div>
            <p className="text-xs text-muted-foreground">
              서빙 중인 모델
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {projectModels.filter(s => s.status === 'InProgress').length}
            </div>
            <p className="text-xs text-muted-foreground">
              배포 진행 중
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {projectModels.filter(s => s.status === 'Failed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              배포 실패
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="모델 검색..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({projectModels.length})</TabsTrigger>
          <TabsTrigger value="ready">Ready ({projectModels.filter(s => s.status === 'Ready').length})</TabsTrigger>
          <TabsTrigger value="progress">In Progress ({projectModels.filter(s => s.status === 'InProgress').length})</TabsTrigger>
          <TabsTrigger value="failed">Failed ({projectModels.filter(s => s.status === 'Failed').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>모델 목록</CardTitle>
              <CardDescription>
                배포된 AI 모델들을 관리합니다 (Project: {currentProject})
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderModelTable(projectModels)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ready">
          <Card>
            <CardContent className="pt-6">
              {renderModelTable(projectModels.filter(s => s.status === 'Ready'))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardContent className="pt-6">
              {renderModelTable(projectModels.filter(s => s.status === 'InProgress'))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failed">
          <Card>
            <CardContent className="pt-6">
              {renderModelTable(projectModels.filter(s => s.status === 'Failed'))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}