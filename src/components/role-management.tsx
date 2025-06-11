'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
  UserCheck,
  Plus,
  Shield,
  Users,
  Settings,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const roles = [
  {
    id: 1,
    name: 'System Admin',
    key: 'system_admin',
    description: 'Full system access with all administrative privileges',
    userCount: 2,
    permissions: [
      'Manage all users',
      'System configuration',
      'Deploy models',
      'View all data',
      'Manage roles',
      'Access admin panel'
    ],
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    name: 'Project Admin',
    key: 'project_admin',
    description: 'Project-level administrative access',
    userCount: 5,
    permissions: [
      'Manage project users',
      'Deploy models',
      'View monitoring',
      'Configure project settings',
      'Enable/disable developers'
    ],
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    createdAt: '2024-01-01',
  },
  {
    id: 3,
    name: 'Developer',
    key: 'developer',
    description: 'Model development and deployment access',
    userCount: 12,
    permissions: [
      'Upload models',
      'Deploy models',
      'View monitoring',
      'Access APIs',
      'View project data'
    ],
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    createdAt: '2024-01-01',
  },
];

export function RoleManagement() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Role Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage user roles and their associated permissions
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>
                Define a new role with specific permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">Role Name</Label>
                <Input id="roleName" placeholder="e.g., Data Analyst" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleKey">Role Key</Label>
                <Input id="roleKey" placeholder="e.g., data_analyst" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role and its responsibilities..."
                />
              </div>
              <div className="space-y-4">
                <Label>Permissions</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>View models</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>Deploy models</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>Manage users</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>System configuration</Label>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1">Cancel</Button>
                <Button className="flex-1">Create Role</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground">
              System-wide roles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {roles.filter(r => r.key.includes('admin')).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Administrative roles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {roles.reduce((sum, role) => sum + role.userCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all roles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Roles</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              User-defined roles
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="templates">Role Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid gap-4">
            {roles.map((role) => (
              <Card key={role.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <UserCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                        <CardDescription>{role.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={role.color}>
                        {role.userCount} users
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Role
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Permissions</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {role.permissions.map((permission, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                            {permission}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t text-sm text-muted-foreground">
                      <span>Created: {role.createdAt}</span>
                      <span>Key: {role.key}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>
                Overview of permissions across all roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Permission</th>
                      <th className="text-center p-2">System Admin</th>
                      <th className="text-center p-2">Project Admin</th>
                      <th className="text-center p-2">Developer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Manage all users</td>
                      <td className="text-center p-2">✓</td>
                      <td className="text-center p-2">✗</td>
                      <td className="text-center p-2">✗</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Deploy models</td>
                      <td className="text-center p-2">✓</td>
                      <td className="text-center p-2">✓</td>
                      <td className="text-center p-2">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">System configuration</td>
                      <td className="text-center p-2">✓</td>
                      <td className="text-center p-2">✗</td>
                      <td className="text-center p-2">✗</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">View monitoring</td>
                      <td className="text-center p-2">✓</td>
                      <td className="text-center p-2">✓</td>
                      <td className="text-center p-2">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Templates</CardTitle>
              <CardDescription>
                Pre-configured role templates for common use cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <UserCheck className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Data Scientist</div>
                      <div className="text-sm text-muted-foreground">ML model development</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Use Template
                  </Button>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <UserCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Data Analyst</div>
                      <div className="text-sm text-muted-foreground">Read-only analysis</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Use Template
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}