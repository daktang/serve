'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Home } from '@/components/home/Home';
import { Dashboard } from '@/components/dashboard';
import { Models } from '@/components/model/Models';
import { ModelTemplates } from '@/components/template/ModelTemplates';
import { APIs } from '@/components/apis';
import { ResourceOverview } from '@/components/resource-overview';
import { Settings } from '@/components/settings';
import { UserManagement } from '@/components/user-management';
import { RoleManagement } from '@/components/role-management';
import { SystemConfig } from '@/components/system-config';
import { TeamMembers } from '@/components/team-members';
import { ApiKeys } from '@/components/api-keys';
import { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentProject, setCurrentProject] = useState('ml-platform');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Mock user data - in real app this would come from auth context
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'project_admin' as const, // Change this to test different roles
    avatar: undefined,
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'dashboard':
        return <Dashboard />;
      case 'models':
        return <Models currentProject={currentProject} />;
      case 'model-templates':
        return <ModelTemplates currentProject={currentProject} />;
      case 'apis':
        return <APIs currentProject={currentProject} />;
      case 'resource-overview':
        return <ResourceOverview currentProject={currentProject} />;
      case 'settings':
        return <Settings />;
      case 'team-members':
        return <TeamMembers userRole={user.role} currentProject={currentProject} />;
      case 'user-management':
        return <UserManagement />;
      case 'role-management':
        return <RoleManagement />;
      case 'system-config':
        return <SystemConfig />;
      case 'api-keys':
        return <ApiKeys userRole={user.role} currentProject={currentProject} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        userRole={user.role}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className={`flex flex-col flex-1 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <Navbar 
          currentProject={currentProject}
          onProjectChange={setCurrentProject}
          user={user}
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}