/**
 * API Keys 페이지 - API 키 관리
 * API 키 생성, 조회, 삭제 및 권한 관리 기능
 */
'use client';

import { ApiKeys } from '@/components/api-key/ApiKeys';

export default function ApiKeysPage() {
  return <ApiKeys userRole="project_admin" currentProject="ml-platform" />;
}