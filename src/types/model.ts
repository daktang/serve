/**
 * Model 관련 타입 정의
 */

export interface ModelData {
  id: number;
  name: string;
  status: 'Ready' | 'InProgress' | 'Failed' | 'Stopped';
  age: string;
  scope: 'Global' | 'Project' | 'Private';
  runtime: string;
  version: string;
  image: string;
  url: string | null;
  project: string;
}

export interface NewModelFormData {
  name: string;
  type: 'Private' | 'Project' | 'Global';
  runtime?: string;
  image?: string;
  modelUri?: string;
  minReplicas?: number;
  maxReplicas?: number;
  cpuRequest?: string;
  memoryRequest?: string;
  template?: string;
}