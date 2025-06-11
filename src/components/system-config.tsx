'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Database, Server, HardDrive, Cpu, MemoryStick as Memory, Network, Shield, AlertTriangle, CheckCircle, Settings, Save, RefreshCw } from 'lucide-react';

export function SystemConfig() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Configuration</h1>
          <p className="text-muted-foreground mt-2">
            Advanced system settings and infrastructure management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Status
          </Button>
          <Button className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Healthy</div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <Memory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4GB</div>
            <p className="text-xs text-muted-foreground">
              of 32GB available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245GB</div>
            <p className="text-xs text-muted-foreground">
              of 1TB available
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="infrastructure" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="infrastructure" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Server Configuration
              </CardTitle>
              <CardDescription>
                Configure server resources and scaling policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-instances">Minimum Instances</Label>
                    <Input id="min-instances" type="number" defaultValue="2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-instances">Maximum Instances</Label>
                    <Input id="max-instances" type="number" defaultValue="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpu-threshold">CPU Scaling Threshold (%)</Label>
                    <Input id="cpu-threshold" type="number" defaultValue="80" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="memory-threshold">Memory Scaling Threshold (%)</Label>
                    <Input id="memory-threshold" type="number" defaultValue="85" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scale-cooldown">Scale Cooldown (seconds)</Label>
                    <Input id="scale-cooldown" type="number" defaultValue="300" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-scaling" defaultChecked />
                    <Label htmlFor="auto-scaling">Enable Auto Scaling</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Network Configuration
              </CardTitle>
              <CardDescription>
                Configure network settings and load balancing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="load-balancer">Load Balancer Type</Label>
                  <Select defaultValue="application">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="application">Application Load Balancer</SelectItem>
                      <SelectItem value="network">Network Load Balancer</SelectItem>
                      <SelectItem value="classic">Classic Load Balancer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="health-check">Health Check Interval (seconds)</Label>
                  <Input id="health-check" type="number" defaultValue="30" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="allowed-ips">Allowed IP Ranges</Label>
                <Textarea
                  id="allowed-ips"
                  placeholder="0.0.0.0/0&#10;192.168.1.0/24"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Settings
              </CardTitle>
              <CardDescription>
                Configure database connections and performance settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-host">Database Host</Label>
                    <Input id="db-host" defaultValue="localhost" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-port">Port</Label>
                    <Input id="db-port" type="number" defaultValue="5432" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-name">Database Name</Label>
                    <Input id="db-name" defaultValue="mlops_portal" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-connections">Max Connections</Label>
                    <Input id="max-connections" type="number" defaultValue="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="connection-timeout">Connection Timeout (ms)</Label>
                    <Input id="connection-timeout" type="number" defaultValue="5000" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="ssl-enabled" defaultChecked />
                    <Label htmlFor="ssl-enabled">Enable SSL</Label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="outline" className="mr-2">Test Connection</Button>
                <Button>Save Database Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Configuration
              </CardTitle>
              <CardDescription>
                Configure security policies and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enable Firewall</div>
                    <div className="text-sm text-muted-foreground">
                      Block unauthorized network access
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">DDoS Protection</div>
                    <div className="text-sm text-muted-foreground">
                      Protect against distributed denial of service attacks
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Intrusion Detection</div>
                    <div className="text-sm text-muted-foreground">
                      Monitor for suspicious activities
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Audit Logging</div>
                    <div className="text-sm text-muted-foreground">
                      Log all system access and changes
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                  <Input id="max-login-attempts" type="number" defaultValue="5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Monitoring Configuration
              </CardTitle>
              <CardDescription>
                Configure system monitoring and alerting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Performance Monitoring</div>
                    <div className="text-sm text-muted-foreground">
                      Monitor system performance metrics
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Error Tracking</div>
                    <div className="text-sm text-muted-foreground">
                      Track and alert on application errors
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Resource Alerts</div>
                    <div className="text-sm text-muted-foreground">
                      Alert when resources exceed thresholds
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metric-retention">Metric Retention (days)</Label>
                  <Input id="metric-retention" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alert-frequency">Alert Check Frequency (minutes)</Label>
                  <Input id="alert-frequency" type="number" defaultValue="5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                Backup Configuration
              </CardTitle>
              <CardDescription>
                Configure automated backups and disaster recovery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Automated Backups</div>
                    <div className="text-sm text-muted-foreground">
                      Enable scheduled database backups
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Model Versioning</div>
                    <div className="text-sm text-muted-foreground">
                      Backup model files and versions
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="retention-period">Retention Period (days)</Label>
                  <Input id="retention-period" type="number" defaultValue="30" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backup-location">Backup Location</Label>
                <Input id="backup-location" defaultValue="s3://mlops-backups/" />
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="outline" className="mr-2">Test Backup</Button>
                <Button>Save Backup Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}