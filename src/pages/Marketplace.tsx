
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, Play, Clock, TrendingUp, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import AutomationCard from "@/components/AutomationCard";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "marketing", label: "Marketing" },
    { id: "analytics", label: "Analytics" },
    { id: "support", label: "Customer Support" },
    { id: "sales", label: "Sales" },
    { id: "hr", label: "Human Resources" },
    { id: "finance", label: "Finance" },
    { id: "operations", label: "Operations" },
  ];

  const automations = [
    {
      title: "Email Campaign Optimizer",
      description: "Automatically optimize email campaigns using AI-driven A/B testing and personalization to increase open rates by up to 40%",
      price: "$29/month",
      rating: 4.9,
      executions: "50K+",
      category: "Marketing"
    },
    {
      title: "Data Analysis Assistant",
      description: "Transform raw data into actionable insights with automated reporting, visualization, and trend analysis",
      price: "$49/month",
      rating: 4.8,
      executions: "75K+",
      category: "Analytics"
    },
    {
      title: "Customer Support Bot",
      description: "Intelligent chatbot that handles customer inquiries, provides instant responses, and escalates complex issues",
      price: "$39/month",
      rating: 4.7,
      executions: "100K+",
      category: "Support"
    },
    {
      title: "Lead Scoring Engine",
      description: "Automatically score and prioritize leads based on behavior, demographics, and engagement patterns",
      price: "$35/month",
      rating: 4.6,
      executions: "25K+",
      category: "Sales"
    },
    {
      title: "Invoice Processing Bot",
      description: "Extract data from invoices, validate information, and automatically update accounting systems",
      price: "$45/month",
      rating: 4.8,
      executions: "30K+",
      category: "Finance"
    },
    {
      title: "Social Media Manager",
      description: "Schedule posts, analyze engagement, and optimize content across multiple social media platforms",
      price: "$25/month",
      rating: 4.5,
      executions: "60K+",
      category: "Marketing"
    },
    {
      title: "Resume Screening AI",
      description: "Automatically screen resumes, match candidates to job requirements, and rank applicants",
      price: "$55/month",
      rating: 4.7,
      executions: "15K+",
      category: "HR"
    },
    {
      title: "Inventory Optimizer",
      description: "Predict demand, optimize stock levels, and automate reordering based on historical data and trends",
      price: "$65/month",
      rating: 4.9,
      executions: "20K+",
      category: "Operations"
    },
    {
      title: "Content Generator",
      description: "Generate high-quality blog posts, product descriptions, and marketing copy using advanced AI",
      price: "$19/month",
      rating: 4.4,
      executions: "85K+",
      category: "Marketing"
    }
  ];

  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           automation.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                {categories.map((category) => (
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
                    <span className="font-medium">2,500+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Users</span>
                    <span className="font-medium">15K+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-medium text-emerald-600">98.5%</span>
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
                  {filteredAutomations.length} Automations Found
                </h2>
                <p className="text-gray-600">
                  {selectedCategory !== "all" && `in ${categories.find(c => c.id === selectedCategory)?.label}`}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Most Popular
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Highest Rated
                </Button>
              </div>
            </div>

            {/* Automation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAutomations.map((automation, index) => (
                <AutomationCard key={index} {...automation} />
              ))}
            </div>

            {/* Load More */}
            {filteredAutomations.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="px-8">
                  Load More Automations
                </Button>
              </div>
            )}

            {/* No Results */}
            {filteredAutomations.length === 0 && (
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
