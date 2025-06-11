/**
 * ModelTemplates 컴포넌트 - 모델 템플릿 라이브러리
 * 
 * 기능:
 * - 사전 구성된 모델 템플릿 목록 표시
 * - 카테고리별 필터링
 * - 템플릿 검색 기능
 * - 템플릿 미리보기 및 사용
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
  BookTemplate as Template,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  Star,
  Clock,
  Users
} from 'lucide-react';
import { useState } from 'react';
import { TemplateData } from '@/types/template';

// Mock data - 실제 환경에서는 API에서 가져옴
const mockTemplates: TemplateData[] = [
  {
    id: 1,
    name: 'PyTorch Image Classification',
    description: 'Pre-configured template for image classification models using PyTorch and TorchServe',
    category: 'Computer Vision',
    framework: 'PyTorch',
    runtime: 'TorchServe',
    popularity: 95,
    downloads: 1247,
    lastUpdated: '2024-01-15',
    author: 'MLOps Team',
    difficulty: 'Beginner',
    status: 'Active'
  },
  {
    id: 2,
    name: 'HuggingFace NLP Pipeline',
    description: 'Ready-to-use template for NLP models with HuggingFace Transformers',
    category: 'Natural Language Processing',
    framework: 'HuggingFace',
    runtime: 'HuggingFace Server',
    popularity: 88,
    downloads: 956,
    lastUpdated: '2024-01-12',
    author: 'AI Research Team',
    difficulty: 'Intermediate',
    status: 'Active'
  },
];

interface ModelTemplatesProps {
  currentProject: string;
}

export function ModelTemplates({ currentProject }: ModelTemplatesProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Computer Vision', 'Natural Language Processing', 'Model Optimization', 'Machine Learning', 'Custom'];

  // 검색 필터링
  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.framework.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // 배지 색상 함수들
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getFrameworkColor = (framework: string) => {
    switch (framework) {
      case 'PyTorch':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'HuggingFace':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'TensorFlow':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // 템플릿 테이블 렌더링
  const renderTemplateTable = (templates: TemplateData[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Framework</TableHead>
          <TableHead>Runtime</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Popularity</TableHead>
          <TableHead>Downloads</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates.map((template) => (
          <TableRow key={template.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Template className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{template.name}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {template.description}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className={getFrameworkColor(template.framework)}>
                {template.framework}
              </Badge>
            </TableCell>
            <TableCell>
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                {template.runtime}
              </code>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className={getDifficultyColor(template.difficulty)}>
                {template.difficulty}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span className="text-sm">{template.popularity}%</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Download className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{template.downloads}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{template.lastUpdated}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Button size="sm" variant="outline" className="h-8 px-2">
                  <Eye className="h-3 w-3 mr-1" />
                  Preview
                </Button>
                <Button size="sm" className="h-8 px-2">
                  <Download className="h-3 w-3 mr-1" />
                  Use
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download
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

  return (
    <div className="p-6 space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Model Templates</h1>
          <p className="text-muted-foreground mt-2">
            Pre-configured templates for quick model deployment - Project: <span className="font-medium">{currentProject}</span>
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Template
        </Button>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* 템플릿 테이블 */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category === 'all' ? 'All Templates' : category}
              <span className="ml-2 bg-muted text-muted-foreground py-0.5 px-2 rounded-full text-xs">
                {category === 'all' ? mockTemplates.length : mockTemplates.filter(t => t.category === category).length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Library</CardTitle>
              <CardDescription>
                Browse and use pre-configured model templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderTemplateTable(filteredTemplates)}
            </CardContent>
          </Card>
        </TabsContent>

        {categories.slice(1).map((category) => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardContent className="pt-6">
                {renderTemplateTable(mockTemplates.filter(t => t.category === category))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* 빈 상태 */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Template className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No templates found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
}