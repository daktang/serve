'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ChevronDown,
  User,
  Settings,
  LogOut,
  Shield
} from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  currentProject: string;
  onProjectChange: (project: string) => void;
  user: {
    name: string;
    email: string;
    role: 'system_admin' | 'project_admin' | 'developer';
    avatar?: string;
  };
}

const projects = [
  { id: 'ml-platform', name: 'ML Platform' },
  { id: 'recommendation-engine', name: 'Recommendation Engine' },
  { id: 'computer-vision', name: 'Computer Vision' },
  { id: 'nlp-services', name: 'NLP Services' },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case 'system_admin':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'project_admin':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'developer':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'system_admin':
      return 'System Admin';
    case 'project_admin':
      return 'Project Admin';
    case 'developer':
      return 'Developer';
    default:
      return role;
  }
};

export function Navbar({ currentProject, onProjectChange, user }: NavbarProps) {
  return (
    <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Left side - Project selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Project:</span>
          <Select value={currentProject} onValueChange={onProjectChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right side - User profile */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 h-auto p-2">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium">{user.name}</div>
                  <Badge variant="outline" className={`text-xs ${getRoleColor(user.role)}`}>
                    {getRoleLabel(user.role)}
                  </Badge>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Preferences
            </DropdownMenuItem>
            {user.role === 'system_admin' && (
              <DropdownMenuItem>
                <Shield className="h-4 w-4 mr-2" />
                Admin Panel
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}