/**
 * Sidebar 컴포넌트 - 사이드 네비게이션
 * 
 * 기능:
 * - 메뉴 항목 표시 및 네비게이션
 * - 사용자 역할별 메뉴 필터링
 * - 사이드바 접기/펼치기
 * - 외부 링크 처리
 * 
 * Props:
 * - activeTab: 현재 활성 탭
 * - onTabChange: 탭 변경 콜백
 * - userRole: 사용자 역할
 * - isCollapsed: 접힘 상태
 * - onToggleCollapse: 접기/펼치기 콜백
 */
'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  Home,
  BarChart3,
  Brain,
  Zap,
  Activity,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Users,
  Shield,
  Database,
  ChevronLeft,
  ChevronRight,
  UserCog,
  UserCheck,
  TrendingUp,
  BarChart,
  PieChart,
  Monitor,
  Settings,
  Key,
  BookTemplate
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: 'system_admin' | 'project_admin' | 'developer';
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const mainItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
];

const aiServingItems = [
  { id: 'models', label: 'Models', icon: Brain },
  { id: 'model-templates', label: 'Model Templates', icon: BookTemplate },
  { id: 'apis', label: 'API Management', icon: Zap },
  { id: 'resource-overview', label: 'Resource Overview', icon: Monitor },
];

const analyticsItems = [
  { id: 'opensearch', label: 'OpenSearch Dashboard', icon: BarChart, external: true, url: 'https://opensearch.example.com' },
  { id: 'grafana', label: 'Grafana Dashboard', icon: TrendingUp, external: true, url: 'https://grafana.example.com' },
  { id: 'api-stats', label: 'API Statistics', icon: PieChart, external: true, url: 'https://api-stats.example.com' },
];

const resourceItems = [
  { id: 'documentation', label: 'Documentation', icon: BookOpen, external: true, url: 'https://docs.example.com' },
  { id: 'support', label: 'Support', icon: HelpCircle, external: true, url: 'https://support.example.com' },
  { id: 'community', label: 'Community', icon: Users, external: true, url: 'https://community.example.com' },
];

export function Sidebar({ activeTab, onTabChange, userRole, isCollapsed, onToggleCollapse }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    main: true,
    aiServing: true,
    analytics: true,
    resources: true,
    management: true,
  });

  const handleExternalClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleSection = (section: string) => {
    if (!isCollapsed) {
      setExpandedSections(prev => ({
        ...prev,
        [section]: !prev[section as keyof typeof prev]
      }));
    }
  };

  // Admin items based on role
  const getManagementItems = () => {
    const baseItems = [
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'api-keys', label: 'API Keys', icon: Key },
    ];
    
    if (userRole === 'system_admin') {
      return [
        ...baseItems,
        { id: 'team-members', label: 'Team Members', icon: UserCog },
        { id: 'user-management', label: 'User Management', icon: Shield },
        { id: 'role-management', label: 'Role Management', icon: UserCheck },
        { id: 'system-config', label: 'System Config', icon: Database },
      ];
    } else if (userRole === 'project_admin') {
      return [
        ...baseItems,
        { id: 'team-members', label: 'Team Members', icon: UserCog },
      ];
    }
    
    return baseItems;
  };

  const managementItems = getManagementItems();
  const showManagementSection = true; // All users can see management section

  const SectionHeader = ({ title, isExpanded, onToggle }: { title: string; isExpanded: boolean; onToggle: () => void }) => {
    if (isCollapsed) return null;
    
    return (
      <Button
        variant="ghost"
        className="w-full justify-between px-3 py-2 h-auto text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors duration-200"
        onClick={onToggle}
      >
        {title}
        <ChevronRight className={cn("h-3 w-3 transition-transform duration-200", isExpanded && "rotate-90")} />
      </Button>
    );
  };

  const renderMenuItems = (items: any[], isExpanded: boolean) => {
    if (isCollapsed || isExpanded) {
      return items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        if (item.external) {
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                'w-full transition-all duration-200 hover:bg-accent hover:text-accent-foreground',
                isCollapsed ? 'justify-center px-2 h-12' : 'justify-start gap-3 h-10'
              )}
              onClick={() => handleExternalClick(item.url)}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                </>
              )}
            </Button>
          );
        }

        return (
          <Button
            key={item.id}
            variant={isActive ? 'secondary' : 'ghost'}
            className={cn(
              'w-full transition-all duration-200 hover:bg-accent hover:text-accent-foreground',
              isCollapsed ? 'justify-center px-2 h-12' : 'justify-start gap-3 h-10',
              isActive && 'bg-secondary/80 font-medium shadow-sm'
            )}
            onClick={() => onTabChange(item.id)}
            title={isCollapsed ? item.label : undefined}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </Button>
        );
      });
    }
    return null;
  };

  return (
    <div className={cn(
      "bg-card border-r border-border h-full flex flex-col transition-all duration-300 ease-in-out fixed left-0 top-0 z-50 shadow-lg",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 bg-primary rounded-lg flex-shrink-0">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h1 className="font-bold text-lg truncate">MLOps Portal</h1>
                <p className="text-sm text-muted-foreground truncate">AI Serving Platform</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className={cn(
              "h-8 w-8 p-0 hover:bg-accent transition-colors duration-200",
              isCollapsed && "mx-auto"
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-4">
          {/* Main Section */}
          <div className="space-y-2">
            <SectionHeader 
              title="Main" 
              isExpanded={expandedSections.main}
              onToggle={() => toggleSection('main')}
            />
            <div className="space-y-1">
              {renderMenuItems(mainItems, expandedSections.main)}
            </div>
          </div>

          {/* AI Serving Tools Section */}
          <div className="space-y-2">
            <SectionHeader 
              title="AI Serving Tools" 
              isExpanded={expandedSections.aiServing}
              onToggle={() => toggleSection('aiServing')}
            />
            <div className="space-y-1">
              {renderMenuItems(aiServingItems, expandedSections.aiServing)}
            </div>
          </div>

          {/* Analytics & Monitoring Section */}
          <div className="space-y-2">
            <SectionHeader 
              title="Analytics & Monitoring" 
              isExpanded={expandedSections.analytics}
              onToggle={() => toggleSection('analytics')}
            />
            <div className="space-y-1">
              {renderMenuItems(analyticsItems, expandedSections.analytics)}
            </div>
          </div>

          {/* Resources Section */}
          <div className="space-y-2">
            <SectionHeader 
              title="Resources" 
              isExpanded={expandedSections.resources}
              onToggle={() => toggleSection('resources')}
            />
            <div className="space-y-1">
              {renderMenuItems(resourceItems, expandedSections.resources)}
            </div>
          </div>

          {/* Management Section */}
          {showManagementSection && (
            <div className="space-y-2">
              <SectionHeader 
                title="Management" 
                isExpanded={expandedSections.management}
                onToggle={() => toggleSection('management')}
              />
              <div className="space-y-1">
                {renderMenuItems(managementItems, expandedSections.management)}
              </div>
            </div>
          )}
        </nav>
      </ScrollArea>
      
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className={cn(
          "flex items-center transition-all duration-200",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <div className="text-sm text-muted-foreground">Theme</div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}