/**
 * Models 페이지 - AI 모델 관리 메인 페이지
 * 모델 목록, 배포 상태, 새 모델 생성 등의 기능을 제공
 */
'use client';

import { Models } from '@/components/model/Models';

export default function ModelsPage() {
  return <Models currentProject="ml-platform" />;
}