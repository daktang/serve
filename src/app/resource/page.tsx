/**
 * Resource Overview 페이지 - 리소스 사용량 모니터링
 * CPU, 메모리, GPU 등 시스템 리소스 현황을 시각화
 */
'use client';

import { ResourceOverview } from '@/components/resource/ResourceOverview';

export default function ResourcePage() {
  return <ResourceOverview currentProject="ml-platform" />;
}