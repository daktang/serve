/**
 * NewModelModal 컴포넌트 - 새 모델 배포 모달
 * 
 * 기능:
 * - 새 모델 배포를 위한 폼 제공
 * - 모델 타입별 다른 폼 렌더링 (Private/Project/Global)
 * - 템플릿 선택 기능 (Private/Project 타입)
 * - 직접 설정 기능 (Global 타입)
 * 
 * Props:
 * - isOpen: 모달 열림 상태
 * - onClose: 모달 닫기 콜백
 */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BookTemplate as Template } from 'lucide-react';
import { useState } from 'react';

interface NewModelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewModelModal({ isOpen, onClose }: NewModelModalProps) {
  const [selectedType, setSelectedType] = useState<'Private' | 'Project' | 'Global'>('Project');

  // Global 타입일 때 직접 설정 폼 렌더링
  const renderGlobalForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="modelName">Model Name</Label>
          <Input id="modelName" placeholder="my-model" />
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
        <Input id="image" placeholder="pytorch/torchserve:0.8.0-gpu" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="modelUri">Model URI</Label>
        <Input id="modelUri" placeholder="gs://my-bucket/models/resnet50/" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minReplicas">Min Replicas</Label>
          <Input id="minReplicas" type="number" placeholder="1" defaultValue="1" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxReplicas">Max Replicas</Label>
          <Input id="maxReplicas" type="number" placeholder="5" defaultValue="5" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cpuRequest">CPU Request</Label>
          <Input id="cpuRequest" placeholder="100m" defaultValue="100m" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="memoryRequest">Memory Request</Label>
          <Input id="memoryRequest" placeholder="512Mi" defaultValue="512Mi" />
        </div>
      </div>
    </div>
  );

  // Private/Project 타입일 때 템플릿 선택 폼 렌더링
  const renderTemplateForm = () => (
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
        <Input id="templateModelName" placeholder="Enter model name" />
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Model Deployment</DialogTitle>
          <DialogDescription>
            새로운 AI 모델을 배포합니다
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          {/* 모델 타입 선택 */}
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
          
          {/* 타입별 폼 렌더링 */}
          {selectedType === 'Global' ? renderGlobalForm() : renderTemplateForm()}
          
          {/* 액션 버튼 */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={onClose}>
              Deploy Model
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}