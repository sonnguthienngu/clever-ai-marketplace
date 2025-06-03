
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, Play, Clock, TrendingUp, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import AutomationCard from "@/components/AutomationCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Automation {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  total_executions: number;
  setup_time_minutes: number;
  is_featured: boolean;
  category: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automation_categories')
        .select('*')
        .order('name');
        
      if (error) {
        console.error('Error fetching categories:', error);
        return [];
      }
      
      return data || [];
    }
  });

  // Fetch automations
  const { data: automations = [] } = useQuery({
    queryKey: ['automations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automations')
        .select(`
          *,
          automation_categories!inner(name)
        `)
        .order('is_featured', { ascending: false })
        .order('total_executions', { ascending: false });
        
      if (error) {
        console.error('Error fetching automations:', error);
        return [];
      }
      
      return data?.map(automation => ({
        id: automation.id,
        title: automation.title,
        description: automation.description,
        price: automation.price,
        rating: automation.rating,
        total_executions: automation.total_executions,
        setup_time_minutes: automation.setup_time_minutes,
        is_featured: automation.is_featured,
        category: {
          name: automation.automation_categories.name
        }
      })) || [];
    }
  });

  const categoryOptions = [
    { id: "all", label: "All Categories" },
    ...categories.map(cat => ({ id: cat.id, label: cat.name }))
  ];

  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           categories.find(cat => cat.id === selectedCategory)?.name === automation.category.name;
    return matchesSearch && matchesCategory;
  });

  const sortedAutomations = [...filteredAutomations].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.total_executions - a.total_executions;
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'featured':
      default:
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return b.total_executions - a.total_executions;
    }
  });

  const formatPrice = (price: number) => {
    return price === 0 ? "Free" : `$${price.toFixed(2)}/month`;
  };

  const formatExecutions = (executions: number) => {
    if (executions >= 1000) {
      return `${(executions / 1000).toFixed(1)}K+`;
    }
    return `${executions}+`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Automation Marketplace
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover thousands of ready-to-deploy AI automations built by experts
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search automations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Categories
              </h3>
              
              <div className="space-y-2">
                {categoryOptions.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? "bg-emerald-100 text-emerald-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Marketplace Stats</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Automations</span>
                    <span className="font-medium">{automations.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categories</span>
                    <span className="font-medium">{categories.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Featured</span>
                    <span className="font-medium text-emerald-600">
                      {automations.filter(a => a.is_featured).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {sortedAutomations.length} Automations Found
                </h2>
                <p className="text-gray-600">
                  {selectedCategory !== "all" && `in ${categoryOptions.find(c => c.id === selectedCategory)?.label}`}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant={sortBy === 'popular' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSortBy('popular')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Most Popular
                </Button>
                <Button 
                  variant={sortBy === 'rating' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSortBy('rating')}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Highest Rated
                </Button>
              </div>
            </div>

            {/* Automation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedAutomations.map((automation) => (
                <AutomationCard 
                  key={automation.id}
                  title={automation.title}
                  description={automation.description}
                  price={formatPrice(automation.price)}
                  rating={automation.rating || 0}
                  executions={formatExecutions(automation.total_executions || 0)}
                  category={automation.category.name}
                />
              ))}
            </div>

            {/* No Results */}
            {sortedAutomations.length === 0 && (
              <div className="text-center py-12">
                <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No automations found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or browse different categories
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
