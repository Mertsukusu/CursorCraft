"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useWizardStore } from "@/lib/store/useWizardStore";
import { getFrameworksByPlatform } from "@/lib/data/platforms-frameworks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Search } from "lucide-react";

/**
 * Third step of the wizard: Framework selection
 */
export function StepFramework() {
  const { platform, framework, setFramework } = useWizardStore();
  const [searchQuery, setSearchQuery] = useState("");
  
  const frameworks = useMemo(() => {
    if (!platform) return [];
    return getFrameworksByPlatform(platform);
  }, [platform]);
  
  // Group frameworks by category
  const frameworksByCategory = useMemo(() => {
    const categories: Record<string, typeof frameworks> = {};
    
    frameworks.forEach(f => {
      if (!categories[f.category]) {
        categories[f.category] = [];
      }
      categories[f.category].push(f);
    });
    
    return categories;
  }, [frameworks]);
  
  // Filter frameworks based on search query
  const filteredFrameworks = useMemo(() => {
    if (!searchQuery.trim()) return frameworksByCategory;
    
    const query = searchQuery.toLowerCase();
    const filtered: Record<string, typeof frameworks> = {};
    
    Object.entries(frameworksByCategory).forEach(([category, categoryFrameworks]) => {
      const matchingFrameworks = categoryFrameworks.filter(f => 
        f.name.toLowerCase().includes(query) || 
        f.description.toLowerCase().includes(query)
      );
      
      if (matchingFrameworks.length > 0) {
        filtered[category] = matchingFrameworks;
      }
    });
    
    return filtered;
  }, [frameworksByCategory, searchQuery]);

  if (!platform) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Choose Framework</CardTitle>
          <CardDescription>
            Please select a platform first
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Choose Framework</CardTitle>
        <CardDescription>
          Select the framework you want to use for your {platform} application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search frameworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {Object.keys(filteredFrameworks).length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No frameworks found matching your search</p>
          </div>
        ) : (
          Object.entries(filteredFrameworks).map(([category, categoryFrameworks]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryFrameworks.map((fw) => (
                  <div
                    key={fw.id}
                    className={cn(
                      "framework-card flex flex-col items-center p-6 rounded-lg border-2 cursor-pointer",
                      framework === fw.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent hover:border-primary/20 hover:bg-accent/50"
                    )}
                    onClick={() => setFramework(fw.id)}
                  >
                    <div className="w-16 h-16 mb-4 relative flex items-center justify-center">
                      {/* Fallback to placeholder if image fails to load */}
                      <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center text-2xl font-bold text-primary">
                        {fw.name.charAt(0)}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium">{fw.name}</h3>
                    <p className="text-sm text-center text-muted-foreground mt-2">
                      {fw.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
} 