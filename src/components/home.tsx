'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Shield,
  Rocket,
  Star,
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const notices = [
  {
    id: 1,
    title: 'System Maintenance Scheduled',
    content: 'Scheduled maintenance on January 20th, 2024 from 2:00 AM to 4:00 AM UTC. All services will be temporarily unavailable.',
    type: 'warning',
    date: '2024-01-15',
    priority: 'high',
  },
  {
    id: 2,
    title: 'New Model Templates Available',
    content: 'We have added new PyTorch and HuggingFace model templates to help you deploy models faster.',
    type: 'info',
    date: '2024-01-14',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'API Rate Limits Updated',
    content: 'API rate limits have been increased to 2000 requests per hour for all users.',
    type: 'success',
    date: '2024-01-12',
    priority: 'low',
  },
];

const features = [
  {
    icon: Brain,
    title: 'AI Model Management',
    description: 'Deploy and manage your machine learning models with ease',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
  },
  {
    icon: Zap,
    title: 'High Performance APIs',
    description: 'Lightning-fast API endpoints for real-time inference',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900',
  },
  {
    icon: Globe,
    title: 'Global Deployment',
    description: 'Deploy your models across multiple regions worldwide',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together with your team on ML projects',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
  },
  {
    icon: TrendingUp,
    title: 'Real-time Monitoring',
    description: 'Monitor your models performance and usage in real-time',
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security for your AI infrastructure',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900',
  },
];

const stats = [
  { label: 'Active Models', value: '24', change: '+12%' },
  { label: 'API Requests Today', value: '18.2K', change: '+23%' },
  { label: 'Success Rate', value: '99.8%', change: '+0.2%' },
  { label: 'Avg Response Time', value: '94ms', change: '-8ms' },
];

export function Home() {
  const getNoticeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'info':
        return <Bell className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getNoticeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950';
      case 'success':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950';
      case 'info':
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950';
      default:
        return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Rocket className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            MLOps AI Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The comprehensive platform for deploying, managing, and scaling your AI models in production
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="flex items-center gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="notices">Notice List</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-green-600">{stat.change}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features Grid */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                            <Icon className={`h-6 w-6 ${feature.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Get started with common tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <Brain className="h-6 w-6" />
                    <span>Deploy Model</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <Zap className="h-6 w-6" />
                    <span>Create API</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    <span>View Analytics</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <Users className="h-6 w-6" />
                    <span>Manage Team</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notices" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">System Notices</h2>
              <p className="text-muted-foreground">
                Stay updated with the latest announcements and system updates
              </p>
            </div>

            <div className="space-y-4">
              {notices.map((notice) => (
                <Card key={notice.id} className={`border-l-4 ${getNoticeColor(notice.type)}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getNoticeIcon(notice.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{notice.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant={notice.priority === 'high' ? 'destructive' : notice.priority === 'medium' ? 'default' : 'secondary'}>
                              {notice.priority}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {notice.date}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{notice.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}