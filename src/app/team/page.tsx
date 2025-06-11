/**
 * Team Members 페이지 - 팀 멤버 관리
 * 프로젝트 팀원 목록, 권한 관리, 멤버 추가/제거 기능
 */
'use client';

import { TeamMembers } from '@/components/team/TeamMembers';

export default function TeamPage() {
  return <TeamMembers userRole="project_admin" currentProject="ml-platform" />;
}