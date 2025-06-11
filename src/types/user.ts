/**
 * User 및 Team 관련 타입 정의
 */

export interface UserData {
  id: number;
  name: string;
  email: string;
  role: 'system_admin' | 'project_admin' | 'developer';
  status: 'Active' | 'Inactive';
  lastLogin: string;
  createdAt: string;
  project: string;
  enabled: boolean;
  avatar: string;
}

export interface ApiKeyData {
  id: number;
  name: string;
  key: string;
  owner: string;
  createdDate: string;
  expiryDate: string;
  lastUsed: string;
  status: 'active' | 'expired' | 'revoked';
  project: string;
  permissions: string[];
}