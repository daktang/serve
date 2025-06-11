'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Users as UsersIcon,
  UserPlus,
  Shield,
  Mail,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Key,
  UserCheck,
  Search,
  Filter
} from 'lucide-react';
import { useState } from 'react';

interface TeamMembersProps {
  userRole: 'system_admin' | 'project_admin' | 'developer';
  currentProject: string;
}

const projectUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'project_admin',
    status: 'Active',
    lastLogin: '2024-01-15 14:30',
    createdAt: '2024-01-01',
    project: 'ml-platform',
    enabled: true,
    avatar: 'JD',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'developer',
    status: 'Active',
    lastLogin: '2024-01-15 09:15',
    createdAt: '2024-01-05',
    project: 'ml-platform',
    enabled: true,
    avatar: 'JS',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'developer',
    status: 'Inactive',
    lastLogin: '2024-01-10 16:45',
    createdAt: '2024-01-08',
    project: 'computer-vision',
    enabled: false,
    avatar: 'BJ',
  },
  {
    id: 4,
    name: 'Alice Wilson',
    email: 'alice.wilson@example.com',
    role: 'developer',
    status: 'Active',
    lastLogin: '2024-01-15 11:20',
    createdAt: '2024-01-12',
    project: 'ml-platform',
    enabled: true,
    avatar: 'AW',
  },
];

export function TeamMembers({ userRole, currentProject }: TeamMembersProps) {
  const [users, setUsers] = useState(projectUsers);
  
  // Filter users by current project
  const filteredUsers = users.filter(user => user.project === currentProject);

  // Check access permissions
  const hasAccess = userRole === 'project_admin' || userRole === 'system_admin';

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'system_admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'project_admin':
        return 'bg-primary/10 text-primary';
      case 'developer':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Inactive':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const handleToggleUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, enabled: !user.enabled, status: !user.enabled ? 'Active' : 'Inactive' }
        : user
    ));
  };

  const canManageRoles = userRole === 'system_admin';
  const canEnableDevelopers = userRole === 'project_admin' || userRole === 'system_admin';

  if (!hasAccess) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You don't have permission to view team members.
                Only Project Admins and System Admins can access this page.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
          <p className="text-muted-foreground mt-2">
            Manage team members in project: <span className="font-medium text-primary">{currentProject}</span>
          </p>
        </div>
        {canManageRoles && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
                <DialogDescription>
                  Add a new team member to the current project
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {userRole === 'system_admin' && (
                        <>
                          <SelectItem value="system_admin">System Admin</SelectItem>
                          <SelectItem value="project_admin">Project Admin</SelectItem>
                        </>
                      )}
                      <SelectItem value="developer">Developer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">Cancel</Button>
                  <Button className="flex-1">Add Member</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-3xl font-bold text-foreground">{filteredUsers.length}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <UsersIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {filteredUsers.filter(u => u.status === 'Active').length} active
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Project Admins</p>
                <p className="text-3xl font-bold text-foreground">
                  {filteredUsers.filter(u => u.role === 'project_admin').length}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Project administrators
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Developers</p>
                <p className="text-3xl font-bold text-foreground">
                  {filteredUsers.filter(u => u.role === 'developer').length}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <UsersIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Active developers
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recent Logins</p>
                <p className="text-3xl font-bold text-foreground">
                  {filteredUsers.filter(u => {
                    const lastLogin = new Date(u.lastLogin);
                    const today = new Date();
                    const diffTime = Math.abs(today.getTime() - lastLogin.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays <= 1;
                  }).length}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              In last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Members List */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Project Team Members</CardTitle>
          <CardDescription className="text-muted-foreground">
            Members with access to the current project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {user.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{user.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Last login: {user.lastLogin}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant="outline" className={getRoleColor(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </div>
                  
                  <Badge variant={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>

                  {/* Enable/Disable for developers (project_admin can do this) */}
                  {user.role === 'developer' && canEnableDevelopers && (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={user.enabled}
                        onCheckedChange={() => handleToggleUser(user.id)}
                      />
                      <span className="text-sm text-muted-foreground">
                        {user.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {canManageRoles && (
                        <>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Member
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Key className="h-4 w-4 mr-2" />
                            Reset Password
                          </DropdownMenuItem>
                        </>
                      )}
                      {user.role === 'developer' && canEnableDevelopers && (
                        <DropdownMenuItem onClick={() => handleToggleUser(user.id)}>
                          <UserCheck className="h-4 w-4 mr-2" />
                          {user.enabled ? 'Disable' : 'Enable'} Member
                        </DropdownMenuItem>
                      )}
                      {canManageRoles && (
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Member
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}