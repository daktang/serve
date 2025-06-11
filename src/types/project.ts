/**
 * Project 관련 타입 정의
 */

export interface ProjectData {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  owner: string;
  members: string[];
  status: 'active' | 'inactive' | 'archived';
}

export interface ResourceUsage {
  cpu: number;
  memory: number;
  gpu: number;
  storage: number;
}