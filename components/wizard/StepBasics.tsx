"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWizardStore } from "@/lib/store/useWizardStore";

/**
 * First step of the wizard: Project Basics
 */
export function StepBasics() {
  const {
    projectName,
    projectDescription,
    setProjectName,
    setProjectDescription
  } = useWizardStore();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Project Basics</CardTitle>
        <CardDescription>
          Let's start with the basic information about your project
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="project-name" className="text-base">
            Project Name
          </Label>
          <Input
            id="project-name"
            placeholder="my-awesome-project"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="h-10"
          />
          <p className="text-sm text-muted-foreground">
            Choose a unique name for your project. This will be used as the directory name.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-description" className="text-base">
            Description
          </Label>
          <Textarea
            id="project-description"
            placeholder="A modern web application for..."
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="min-h-[120px]"
          />
          <p className="text-sm text-muted-foreground">
            Briefly describe what your project does and its main features.
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 