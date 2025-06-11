/**
 * ModelTable 컴포넌트 - 모델 목록 테이블
 * 
 * 기능:
 * - 모델 정보를 테이블 형태로 표시
 * - 상태별 아이콘 및 배지 표시
 * - 모델 액션 버튼 (시작/중지/설정/삭제)
 * 
 * Props:
 * - models: 표시할 모델 데이터 배열
 */
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Play,
  Pause,
  MoreHorizontal,
  Eye,
  Settings,
  Trash2,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { ModelData } from '@/types/model';

interface ModelTableProps {
  models: ModelData[];
}

export function ModelTable({ models }: ModelTableProps) {
  // 상태별 아이콘 반환
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ready':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'InProgress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'Failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Stopped':
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  // 상태별 배지 색상 반환
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

  // 스코프별 배지 색상 반환
  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'Global':
        return 'bg-primary/10 text-primary';
      case 'Project':
        return 'bg-secondary text-secondary-foreground';
      case 'Private':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // 런타임별 배지 색상 반환
  const getRuntimeColor = (runtime: string) => {
    switch (runtime) {
      case 'pytorch':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'huggingface':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'triton':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'vllm':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // 액션 버튼 활성화 상태 확인
  const canStart = (status: string) => status === 'Stopped' || status === 'Failed';
  const canStop = (status: string) => status === 'Ready' || status === 'InProgress';

  // 모델 클릭 핸들러
  const handleModelClick = (modelId: number) => {
    console.log(`Navigate to model details for ID: ${modelId}`);
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-foreground">모델 목록</CardTitle>
        <CardDescription className="text-muted-foreground">
          배포된 AI 모델들을 관리합니다
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Name</TableHead>
              <TableHead className="text-muted-foreground">Age</TableHead>
              <TableHead className="text-muted-foreground">Scope</TableHead>
              <TableHead className="text-muted-foreground">Runtime</TableHead>
              <TableHead className="text-muted-foreground">Version</TableHead>
              <TableHead className="text-muted-foreground">Image</TableHead>
              <TableHead className="text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((model) => (
              <TableRow key={model.id} className="border-border">
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(model.status)}
                    <Badge variant={getStatusColor(model.status)}>
                      {model.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-medium text-left justify-start text-foreground"
                    onClick={() => handleModelClick(model.id)}
                  >
                    {model.name}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </TableCell>
                <TableCell className="text-muted-foreground">{model.age}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getScopeColor(model.scope)}>
                    {model.scope}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getRuntimeColor(model.runtime)}>
                    {model.runtime}
                  </Badge>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    {model.version}
                  </code>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-1 py-0.5 rounded max-w-[200px] block truncate">
                    {model.image}
                  </code>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {canStart(model.status) && (
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Play className="h-3 w-3" />
                      </Button>
                    )}
                    {canStop(model.status) && (
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
                        <DropdownMenuItem onClick={() => handleModelClick(model.id)}>
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
      </CardContent>
    </Card>
  );
}