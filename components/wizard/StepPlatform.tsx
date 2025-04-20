"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWizardStore } from "@/lib/store/useWizardStore";
import { platforms } from "@/lib/data/platforms-frameworks";
import { Globe, Smartphone, Server, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Get the appropriate icon for a platform
 */
function getPlatformIcon(iconName: string) {
  switch (iconName) {
    case "globe":
      return <Globe className="h-8 w-8 mb-2 text-primary" />;
    case "smartphone":
      return <Smartphone className="h-8 w-8 mb-2 text-primary" />;
    case "server":
      return <Server className="h-8 w-8 mb-2 text-primary" />;
    case "monitor":
      return <Monitor className="h-8 w-8 mb-2 text-primary" />;
    default:
      return <Globe className="h-8 w-8 mb-2 text-primary" />;
  }
}

/**
 * Second step of the wizard: Platform selection
 */
export function StepPlatform() {
  const { platform, setPlatform } = useWizardStore();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Choose Platform</CardTitle>
        <CardDescription>
          Select the platform you want to build for
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((p) => (
            <div
              key={p.id}
              className={cn(
                "framework-card flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer",
                platform === p.id
                  ? "border-primary bg-primary/5"
                  : "border-transparent hover:border-primary/20 hover:bg-accent/50"
              )}
              onClick={() => setPlatform(p.id)}
            >
              {getPlatformIcon(p.icon)}
              <h3 className="text-lg font-medium">{p.name}</h3>
              <p className="text-sm text-center text-muted-foreground mt-2">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 