
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Zap, LogOut, User, BarChart3, Settings, Plus, Clock, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface UserAnalytics {
  total_executions: number;
  total_time_saved_minutes: number;
  last_active: string;
}

interface RecentExecution {
  id: string;
  automation_title: string;
  status: string;
  created_at: string;
  execution_time_ms: number | null;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Fetch user analytics
  const { data: analytics } = useQuery({
    queryKey: ['user-analytics', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching analytics:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!user?.id
  });

  // Fetch recent executions
  const { data: recentExecutions } = useQuery({
    queryKey: ['recent-executions', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('automation_executions')
        .select(`
          id,
          status,
          created_at,
          execution_time_ms,
          automations!inner(title)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (error) {
        console.error('Error fetching executions:', error);
        return [];
      }
      
      return data?.map(execution => ({
        id: execution.id,
        automation_title: execution.automations.title,
        status: execution.status,
        created_at: execution.created_at,
        execution_time_ms: execution.execution_time_ms
      })) || [];
    },
    enabled: !!user?.id
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'running': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const statsCards = [
    { 
      title: 'Total Executions', 
      value: analytics?.total_executions?.toString() || '0', 
      icon: Zap, 
      color: 'text-emerald-600' 
    },
    { 
      title: 'Time Saved', 
      value: `${analytics?.total_time_saved_minutes || 0}m`, 
      icon: Clock, 
      color: 'text-blue-600' 
    },
    { 
      title: 'Active Today', 
      value: analytics?.last_active ? '1' : '0', 
      icon: TrendingUp, 
      color: 'text-purple-600' 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">AutomateAI</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="text-sm text-gray-700">{user?.email}</span>
              </div>
              
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your automations today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              className="h-24 flex flex-col items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700"
              onClick={() => navigate('/marketplace')}
            >
              <Plus className="h-6 w-6" />
              <span>Browse Automations</span>
            </Button>
            
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <BarChart3 className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
            
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" onClick={() => navigate('/marketplace')}>
              <Zap className="h-6 w-6" />
              <span>Featured Automations</span>
            </Button>
            
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <Settings className="h-6 w-6" />
              <span>Settings</span>
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentExecutions && recentExecutions.length > 0 ? (
              recentExecutions.map((execution) => (
                <div key={execution.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(execution.status)}`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {execution.automation_title} {execution.status === 'completed' ? 'completed' : execution.status}
                    </p>
                    <p className="text-sm text-gray-600">{formatTimeAgo(execution.created_at)}</p>
                  </div>
                  {execution.execution_time_ms && (
                    <div className="text-sm text-gray-500">
                      {(execution.execution_time_ms / 1000).toFixed(1)}s
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No recent activity</p>
                <p className="text-sm text-gray-400 mt-1">
                  Deploy an automation from the marketplace to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
