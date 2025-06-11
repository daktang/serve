'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Key,
  Plus,
  MoreHorizontal,
  Eye,
  EyeOff,
  Calendar,
  Trash2,
  Shield,
  Copy,
  Search,
  Filter
} from 'lucide-react';
import { useState } from 'react';

interface ApiKeysProps {
  userRole: 'system_admin' | 'project_admin' | 'developer';
  currentProject: string;
}

const apiKeys = [
  {
    id: 1,
    name: 'Production API Key',
    key: 'sk-proj-abc123...def456',
    owner: 'John Doe',
    createdDate: '2024-01-15',
    expiryDate: '2024-07-15',
    lastUsed: '2024-01-15 14:30',
    status: 'active',
    project: 'ml-platform',
    permissions: ['read', 'write'],
  },
  {
    id: 2,
    name: 'Development Key',
    key: 'sk-proj-xyz789...uvw012',
    owner: 'Jane Smith',
    createdDate: '2024-01-10',
    expiryDate: '2024-04-10',
    lastUsed: '2024-01-14 09:15',
    status: 'active',
    project: 'ml-platform',
    permissions: ['read'],
  },
  {
    id: 3,
    name: 'Testing Key',
    key: 'sk-proj-mno345...pqr678',
    owner: 'Bob Johnson',
    createdDate: '2024-01-05',
    expiryDate: '2024-01-20',
    lastUsed: '2024-01-12 16:45',
    status: 'expired',
    project: 'computer-vision',
    permissions: ['read'],
  },
];

export function ApiKeys({ userRole, currentProject }: ApiKeysProps) {
  const [isNewKeyOpen, setIsNewKeyOpen] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<number>>(new Set());

  // Filter keys by current project and user permissions
  const filteredKeys = apiKeys.filter(key => {
    if (userRole === 'system_admin') return true;
    return key.project === currentProject;
  });

  // Check if user can access this page
  const hasAccess = userRole !== 'developer';

  const toggleKeyVisibility = (keyId: number) => {
    const newVisibleKeys = new Set(visibleKeys);
    if (newVisibleKeys.has(keyId)) {
      newVisibleKeys.delete(keyId);
    } else {
      newVisibleKeys.add(keyId);
    }
    setVisibleKeys(newVisibleKeys);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'expired':
        return 'destructive';
      case 'revoked':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isOwner = (keyOwner: string) => {
    return keyOwner === 'John Doe'; // In real app, compare with current user
  };

  if (!hasAccess) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You don't have permission to view API keys.
                Only key owners and admins can access this page.
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
          <h1 className="text-3xl font-bold text-foreground">API Keys</h1>
          <p className="text-muted-foreground mt-2">
            Manage API keys for project: <span className="font-medium text-primary">{currentProject}</span>
          </p>
        </div>
        <Dialog open={isNewKeyOpen} onOpenChange={setIsNewKeyOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Generate API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate New API Key</DialogTitle>
              <DialogDescription>
                Create a new API key for accessing your models
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="keyName">Key Name</Label>
                <Input id="keyName" placeholder="e.g., Production API Key" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" type="date" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsNewKeyOpen(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={() => setIsNewKeyOpen(false)}>
                  Generate Key
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search API keys..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* API Keys Table */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">API Keys</CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage API keys for the current project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Name</TableHead>
                  <TableHead className="text-muted-foreground">Owner</TableHead>
                  <TableHead className="text-muted-foreground">Created Date</TableHead>
                  <TableHead className="text-muted-foreground">Expiry</TableHead>
                  <TableHead className="text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKeys.map((apiKey) => (
                  <TableRow key={apiKey.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <Key className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{apiKey.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {visibleKeys.has(apiKey.id) ? apiKey.key : '••••••••••••••••'}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleKeyVisibility(apiKey.id)}
                              disabled={!isOwner(apiKey.owner) && userRole !== 'system_admin'}
                              className="h-6 w-6 p-0"
                            >
                              {visibleKeys.has(apiKey.id) ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => navigator.clipboard.writeText(apiKey.key)}
                              disabled={!visibleKeys.has(apiKey.id)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{apiKey.owner}</TableCell>
                    <TableCell className="text-muted-foreground">{apiKey.createdDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{apiKey.expiryDate}</span>
                        {isExpiringSoon(apiKey.expiryDate) && (
                          <Badge variant="destructive" className="text-xs">
                            Expiring Soon
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {(isOwner(apiKey.owner) || userRole === 'system_admin') && (
                          <>
                            <Button size="sm" variant="outline" className="text-xs">
                              Extend
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs">
                              Reveal
                            </Button>
                          </>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {(isOwner(apiKey.owner) || userRole === 'system_admin') && (
                              <>
                                <DropdownMenuItem>
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Extend Expiry
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </>
                            )}
                            {!isOwner(apiKey.owner) && userRole !== 'system_admin' && (
                              <DropdownMenuItem disabled>
                                <Shield className="h-4 w-4 mr-2" />
                                No permissions
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}