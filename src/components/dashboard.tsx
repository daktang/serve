'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-center min-h-[600px]">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Construction className="h-16 w-16 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Coming Soon</CardTitle>
            <CardDescription className="text-lg">
              Advanced dashboard features are currently under development.
              Stay tuned for exciting updates!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Real-time analytics</p>
              <p>• Advanced monitoring</p>
              <p>• Custom dashboards</p>
              <p>• Performance insights</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}