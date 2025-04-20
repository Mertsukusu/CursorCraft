"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWizardStore } from "@/lib/store/useWizardStore";
import { getPackagesByPlatformAndFramework } from "@/lib/data/platforms-frameworks";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

/**
 * Fourth step of the wizard: Package selection
 */
export function StepPackages() {
  const { platform, framework, selectedPackages, togglePackage } = useWizardStore();
  const [searchQuery, setSearchQuery] = useState("");

  const packages = useMemo(() => {
    if (!platform || !framework) return [];
    return getPackagesByPlatformAndFramework(platform, framework);
  }, [platform, framework]);

  // Group packages by category
  const packagesByCategory = useMemo(() => {
    const categories: Record<string, typeof packages> = {};

    packages.forEach(pkg => {
      if (!categories[pkg.category]) {
        categories[pkg.category] = [];
      }
      categories[pkg.category].push(pkg);
    });

    return categories;
  }, [packages]);

  // Filter packages based on search query
  const filteredPackages = useMemo(() => {
    if (!searchQuery.trim()) return packagesByCategory;

    const query = searchQuery.toLowerCase();
    const filtered: Record<string, typeof packages> = {};

    Object.entries(packagesByCategory).forEach(([category, categoryPackages]) => {
      const matchingPackages = categoryPackages.filter(pkg =>
        pkg.name.toLowerCase().includes(query) ||
        pkg.description.toLowerCase().includes(query)
      );

      if (matchingPackages.length > 0) {
        filtered[category] = matchingPackages;
      }
    });

    return filtered;
  }, [packagesByCategory, searchQuery]);

  if (!platform || !framework) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Choose Packages</CardTitle>
          <CardDescription>
            Please select a platform and framework first
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Choose Packages</CardTitle>
        <CardDescription>
          Select the packages you want to include in your project
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {Object.keys(filteredPackages).length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No packages found matching your search</p>
          </div>
        ) : (
          Object.entries(filteredPackages).map(([category, categoryPackages]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-semibold">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categoryPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={cn(
                      "flex items-start space-x-3 p-4 rounded-md border cursor-pointer transition-colors",
                      selectedPackages.includes(pkg.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40 hover:bg-accent/50"
                    )}
                    onClick={() => togglePackage(pkg.id)}
                  >
                    <Checkbox
                      id={`pkg-${pkg.id}`}
                      checked={selectedPackages.includes(pkg.id)}
                      onCheckedChange={() => togglePackage(pkg.id)}
                      className="mt-1"
                    />
                    <div className="space-y-1.5">
                      <Label
                        htmlFor={`pkg-${pkg.id}`}
                        className="text-base font-medium cursor-pointer"
                      >
                        {pkg.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        {selectedPackages.length > 0 && (
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">Selected Packages ({selectedPackages.length})</h3>
            <div className="flex flex-wrap gap-2">
              {selectedPackages.map(pkgId => {
                const pkg = packages.find(p => p.id === pkgId);
                return pkg ? (
                  <div
                    key={pkg.id}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm"
                  >
                    <span>{pkg.name}</span>
                    <button
                      className="ml-2 text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePackage(pkg.id);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 