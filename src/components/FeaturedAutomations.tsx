import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp } from "lucide-react";
import { AutomationCard } from './AutomationCard';
import { motion } from "framer-motion";

interface Automation {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  isFeatured?: boolean;
  isTrending?: boolean;
}

interface FeaturedAutomationsProps {
  automations: Automation[];
  onAutomationClick: (automation: Automation) => void;
}

export function FeaturedAutomations({ automations, onAutomationClick }: FeaturedAutomationsProps) {
  const featuredAutomations = automations.filter(a => a.isFeatured);
  const trendingAutomations = automations.filter(a => a.isTrending);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Featured Automations */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Star className="h-5 w-5 text-yellow-500" />
          </motion.div>
          <h2 className="text-2xl font-bold">Featured Automations</h2>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {featuredAutomations.map((automation) => (
            <motion.div
              key={automation.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="relative">
                  <motion.div 
                    className="absolute top-2 right-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="bg-yellow-500 text-white transform transition-transform group-hover:scale-110"
                    >
                      Featured
                    </Badge>
                  </motion.div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {automation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AutomationCard
                    automation={automation}
                    onClick={() => onAutomationClick(automation)}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Trending Automations */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <TrendingUp className="h-5 w-5 text-green-500" />
          </motion.div>
          <h2 className="text-2xl font-bold">Trending Now</h2>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {trendingAutomations.map((automation) => (
            <motion.div
              key={automation.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="relative">
                  <motion.div 
                    className="absolute top-2 right-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="bg-green-500 text-white transform transition-transform group-hover:scale-110"
                    >
                      Trending
                    </Badge>
                  </motion.div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {automation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AutomationCard
                    automation={automation}
                    onClick={() => onAutomationClick(automation)}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}

// Example usage:
const exampleAutomations: Automation[] = [
  {
    id: "1",
    title: "AI Content Generator",
    description: "Generate high-quality content using advanced AI",
    price: 49.99,
    imageUrl: "/images/ai-content.jpg",
    category: "Content Creation",
    rating: 4.8,
    isFeatured: true
  },
  {
    id: "2",
    title: "Social Media Scheduler",
    description: "Automate your social media posts",
    price: 29.99,
    imageUrl: "/images/social-media.jpg",
    category: "Social Media",
    rating: 4.5,
    isTrending: true
  },
  // Add more example automations as needed
]; 