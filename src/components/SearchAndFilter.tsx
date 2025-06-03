import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
}

interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  tags: string[];
  featured: boolean;
  trending: boolean;
  subscription: boolean;
}

const categories = [
  "Web Automation",
  "Data Processing",
  "Social Media",
  "Email Marketing",
  "Content Creation",
  "E-commerce",
  "Analytics",
  "Integration"
];

const tags = [
  "AI",
  "Machine Learning",
  "API",
  "Cloud",
  "Security",
  "Productivity",
  "Marketing",
  "Development"
];

export function SearchAndFilter({ onSearch, onFilter }: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    categories: [],
    tags: [],
    featured: false,
    trending: false,
    subscription: false,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    handleFilterChange({ categories: newCategories });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    handleFilterChange({ tags: newTags });
  };

  const clearFilters = () => {
    const clearedFilters = {
      priceRange: [0, 1000],
      categories: [],
      tags: [],
      featured: false,
      trending: false,
      subscription: false,
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  return (
    <div className="space-y-4">
      <motion.form 
        onSubmit={handleSearch} 
        className="flex gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-hover:text-primary" />
          <Input
            type="text"
            placeholder="Search automations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 transition-all duration-200 hover:bg-primary/10"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button 
          type="submit"
          className="transition-all duration-200 hover:scale-105"
        >
          Search
        </Button>
      </motion.form>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <X className="h-4 w-4" />
                  Clear All
                </Button>
              </div>

              <div className="space-y-6">
                {/* Price Range */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label>Price Range</Label>
                  <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={filters.priceRange}
                    onValueChange={(value) => handleFilterChange({ priceRange: value as [number, number] })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </motion.div>

                {/* Categories */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label>Categories</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category, index) => (
                      <motion.div
                        key={category}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Checkbox
                          id={category}
                          checked={filters.categories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                          className="transition-colors hover:border-primary"
                        />
                        <Label 
                          htmlFor={category} 
                          className="text-sm cursor-pointer hover:text-primary transition-colors"
                        >
                          {category}
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Tags */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Button
                          variant={filters.tags.includes(tag) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleTag(tag)}
                          className="transition-all duration-200 hover:scale-105"
                        >
                          {tag}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Additional Filters */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label>Additional Filters</Label>
                  <div className="space-y-2">
                    {[
                      { id: "featured", label: "Featured Only" },
                      { id: "trending", label: "Trending Only" },
                      { id: "subscription", label: "Subscription Only" }
                    ].map((filter, index) => (
                      <motion.div
                        key={filter.id}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Checkbox
                          id={filter.id}
                          checked={filters[filter.id as keyof FilterOptions] as boolean}
                          onCheckedChange={(checked) => 
                            handleFilterChange({ [filter.id]: checked as boolean })
                          }
                          className="transition-colors hover:border-primary"
                        />
                        <Label 
                          htmlFor={filter.id}
                          className="cursor-pointer hover:text-primary transition-colors"
                        >
                          {filter.label}
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 