
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface RealtimeExecution {
  id: string;
  automation_id: string;
  status: string;
  created_at: string;
  execution_time_ms: number | null;
}

export const useRealtimeExecutions = () => {
  const { user } = useAuth();
  const [executions, setExecutions] = useState<RealtimeExecution[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    // Set up real-time subscription for execution updates
    const channel = supabase
      .channel('execution-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'automation_executions',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Real-time execution update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setExecutions(prev => [payload.new as RealtimeExecution, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setExecutions(prev => 
              prev.map(exec => 
                exec.id === payload.new.id ? payload.new as RealtimeExecution : exec
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return executions;
};
