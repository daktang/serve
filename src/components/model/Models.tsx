/**
 * Models 컴포넌트 - AI 모델 목록 및 관리
 * 
 * 기능:
 * - 모델 목록 테이블 표시
 * - 모델 상태별 필터링 (Ready, InProgress, Failed)
 * - 새 모델 배포 모달
 * - 모델 액션 (시작/중지/삭제)
 * 
 * Props:
 * - currentProject: 현재 선택된 프로젝트 ID
 */
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NewModelModal } from './NewModelModal';
import { ModelTable } from './ModelTable';
import { Brain, Plus, Search, Filter, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useState } from 'react';
import { ModelData } from '@/types/model';

// Mock data - 실제 환경에서는 API에서 가져옴
const mockModels: ModelData[] = [
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
];

interface ModelsProps {
  currentProject: string;
}

export function Models({ currentProject }: ModelsProps) {
  const [isNewModelOpen, setIsNewModelOpen] = useState(false);
  
  // 현재 프로젝트의 모델만 필터링
  const projectModels = mockModels.filter(model => model.project === currentProject);

  return (
    <div className="p-6 space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Models</h1>
          <p className="text-muted-foreground mt-2">
            AI 모델 관리 - Project: <span className="font-medium text-primary">{currentProject}</span>
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

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Models</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{projectModels.length}</div>
            <p className="text-xs text-muted-foreground">
              {projectModels.filter(s => s.status === 'Ready').length} ready
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {projectModels.filter(s => s.status === 'Ready').length}
            </div>
            <p className="text-xs text-muted-foreground">서빙 중인 모델</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {projectModels.filter(s => s.status === 'InProgress').length}
            </div>
            <p className="text-xs text-muted-foreground">배포 진행 중</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {projectModels.filter(s => s.status === 'Failed').length}
            </div>
            <p className="text-xs text-muted-foreground">배포 실패</p>
          </CardContent>
        </Card>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="모델 검색..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* 모델 테이블 탭 */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({projectModels.length})</TabsTrigger>
          <TabsTrigger value="ready">Ready ({projectModels.filter(s => s.status === 'Ready').length})</TabsTrigger>
          <TabsTrigger value="progress">In Progress ({projectModels.filter(s => s.status === 'InProgress').length})</TabsTrigger>
          <TabsTrigger value="failed">Failed ({projectModels.filter(s => s.status === 'Failed').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ModelTable models={projectModels} />
        </TabsContent>

        <TabsContent value="ready">
          <ModelTable models={projectModels.filter(s => s.status === 'Ready')} />
        </TabsContent>

        <TabsContent value="progress">
          <ModelTable models={projectModels.filter(s => s.status === 'InProgress')} />
        </TabsContent>

        <TabsContent value="failed">
          <ModelTable models={projectModels.filter(s => s.status === 'Failed')} />
        </TabsContent>
      </Tabs>

      {/* 새 모델 생성 모달 */}
      <NewModelModal 
        isOpen={isNewModelOpen} 
        onClose={() => setIsNewModelOpen(false)} 
      />
    </div>
  );
}