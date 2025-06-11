'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bell,
  Database,
  Globe,
  Lock,
  Mail,
  Save,
  Settings2,
  Shield,
  Users,
  Webhook
} from 'lucide-react';

export function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure your MLOps platform settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic configuration for your MLOps platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="MLOps AI Portal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" defaultValue="Your Company" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your MLOps platform..."
                  defaultValue="Comprehensive AI model serving and management platform"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                    <SelectItem value="cet">Central European Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage authentication and security policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">
                      Require 2FA for all user accounts
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">API Rate Limiting</div>
                    <div className="text-sm text-muted-foreground">
                      Enable rate limiting for API requests
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">IP Whitelisting</div>
                    <div className="text-sm text-muted-foreground">
                      Restrict access to specific IP addresses
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                    <SelectItem value="complex">Complex (16+ chars, all requirements)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Update Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Slack Integration</div>
                    <div className="text-sm text-muted-foreground">
                      Send alerts to Slack channels
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Browser push notifications
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-address">Notification Email</Label>
                <Input id="email-address" type="email" defaultValue="admin@example.com" />
              </div>

              <div className="space-y-2">
                <Label>Alert Types</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>Model deployment failures</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>High resource usage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>Scheduled reports</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>Security events</Label>
                  </div>
                </div>
              </div>

              <Button className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Integrations
              </CardTitle>
              <CardDescription>
                Connect with external services and tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Database className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Docker Registry</div>
                        <div className="text-sm text-muted-foreground">Container registry</div>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Configure
                  </Button>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <Globe className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">Kubernetes</div>
                        <div className="text-sm text-muted-foreground">Orchestration</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Configure
                  </Button>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <Bell className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Slack</div>
                        <div className="text-sm text-muted-foreground">Team communication</div>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Configure
                  </Button>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                        <Webhook className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium">Webhooks</div>
                        <div className="text-sm text-muted-foreground">Custom integrations</div>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Configure
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Team Members</h3>
                  <p className="text-sm text-muted-foreground">Manage access to your MLOps platform</p>
                </div>
                <Button>Invite User</Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                      AD
                    </div>
                    <div>
                      <div className="font-medium">Admin User</div>
                      <div className="text-sm text-muted-foreground">admin@example.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="admin">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-sm font-semibold">
                      DS
                    </div>
                    <div>
                      <div className="font-medium">Data Scientist</div>
                      <div className="text-sm text-muted-foreground">ds@example.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="editor">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Settings
              </CardTitle>
              <CardDescription>
                Advanced system configuration and maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="log-retention">Log Retention (days)</Label>
                  <Input id="log-retention" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Automatic Updates</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically install security updates
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Debug Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Enable detailed logging for troubleshooting
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Maintenance Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Temporarily disable API access for maintenance
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline">
                    Export Configuration
                  </Button>
                  <Button variant="outline">
                    Import Configuration
                  </Button>
                  <Button variant="destructive">
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}