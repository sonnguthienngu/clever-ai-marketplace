import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play, Clock, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AutomationCardProps {
  id?: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  executions: string;
  category: string;
  icon?: React.ReactNode;
}

const AutomationCard = ({ 
  id, 
  title, 
  description, 
  price, 
  rating, 
  executions, 
  category,
  icon 
}: AutomationCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDeploying, setIsDeploying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDeploy = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to deploy automations",
        variant: "destructive"
      });
      return;
    }

    if (!id) {
      toast({
        title: "Error",
        description: "Automation ID not found",
        variant: "destructive"
      });
      return;
    }

    setIsDeploying(true);
    
    try {
      // Create a new execution record
      const { data, error } = await supabase
        .from('automation_executions')
        .insert({
          user_id: user.id,
          automation_id: id,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Simulate deployment process
      setTimeout(async () => {
        try {
          const executionTime = Math.floor(Math.random() * 5000) + 1000; // 1-6 seconds
          
          await supabase
            .from('automation_executions')
            .update({
              status: 'completed',
              execution_time_ms: executionTime,
              completed_at: new Date().toISOString()
            })
            .eq('id', data.id);

          toast({
            title: "Automation deployed successfully!",
            description: `${title} is now running and will save you time automatically.`
          });
        } catch (updateError) {
          console.error('Error updating execution:', updateError);
          
          await supabase
            .from('automation_executions')
            .update({
              status: 'failed',
              error_message: 'Deployment failed',
              completed_at: new Date().toISOString()
            })
            .eq('id', data.id);

          toast({
            title: "Deployment failed",
            description: "There was an error deploying the automation. Please try again.",
            variant: "destructive"
          });
        } finally {
          setIsDeploying(false);
        }
      }, 2000);

    } catch (error: any) {
      console.error('Error deploying automation:', error);
      toast({
        title: "Deployment failed",
        description: error.message || "There was an error deploying the automation. Please try again.",
        variant: "destructive"
      });
      setIsDeploying(false);
    }
  };

  return (
    <motion.div 
      className={cn(
        "group relative bg-white rounded-2xl shadow-sm border border-gray-200 p-6",
        "hover:shadow-xl transition-all duration-300",
        "hover:border-emerald-200 hover:bg-gradient-to-b hover:from-white hover:to-emerald-50"
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <Badge 
            variant="secondary" 
            className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {category}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex items-start gap-4 mb-4">
          {icon && (
            <div className="p-2 bg-emerald-100 rounded-lg">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-600 line-clamp-2">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Play className="h-4 w-4 text-emerald-600" />
            <span>{executions} runs</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-emerald-600" />
            <span>2-5 min setup</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">{price}</div>
          <Button 
            className={cn(
              "bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full",
              "transition-all duration-300 transform",
              "hover:shadow-lg hover:shadow-emerald-600/20",
              isDeploying && "opacity-75 cursor-not-allowed"
            )}
            onClick={handleDeploy}
            disabled={isDeploying}
          >
            {isDeploying ? (
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                Deploying...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Deploy Now
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AutomationCard;
