/**
 * Template 관련 타입 정의
 */

export interface TemplateData {
  id: number;
  name: string;
  description: string;
  category: string;
  framework: string;
  runtime: string;
  popularity: number;
  downloads: number;
  lastUpdated: string;
  author: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Active' | 'Beta' | 'Deprecated';
}

export interface NewTemplateFormData {
  name: string;
  description: string;
  category: string;
  framework: string;
  runtime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}