/**
 * Model Templates 페이지 - 모델 템플릿 라이브러리
 * 사전 구성된 템플릿 목록과 사용 기능을 제공
 */
'use client';

import { ModelTemplates } from '@/components/template/ModelTemplates';

export default function TemplatesPage() {
  return <ModelTemplates currentProject="ml-platform" />;
}