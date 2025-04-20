"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/auth-provider";
import { ProjectType } from "@/app/projects/new/page";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectGeneratorProps {
  onProjectBasics?: (name: string, description: string) => void;
  projectType: ProjectType;
}

/**
 * Project generator component
 * @returns Project generator component
 */
export function ProjectGenerator({ onProjectBasics, projectType }: ProjectGeneratorProps) {
  const router = useRouter();
  const { user } = useAuth();
  
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Validates form and proceeds to next step or generates project
   */
  const handleContinue = () => {
    if (!projectName.trim()) {
      setError("Please enter a project name");
      return;
    }

    if (!user) {
      setError("You must be logged in to create a project");
      return;
    }

    if (onProjectBasics) {
      // If in wizard flow, continue to next step
      onProjectBasics(projectName, projectDescription);
    } else {
      // Legacy direct generation flow
      handleGenerateProject();
    }
  };

  /**
   * Handles project generation
   */
  const handleGenerateProject = async () => {
    if (!projectName.trim()) {
      setError("Please enter a project name");
      return;
    }

    if (!user) {
      setError("You must be logged in to create a project");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Get Supabase client inside the function to ensure it's freshly created
      const supabase = createSupabaseClient();
      
      // Simulate project generation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save to Supabase
      const { data, error: dbError } = await supabase
        .from('projects')
        .insert([
          {
            name: projectName,
            description: projectDescription || "No description provided",
            template_type: projectType,
            user_id: user.id,
          }
        ])
        .select();

      if (dbError) throw dbError;

      router.push("/projects");
    } catch (err: any) {
      console.error("Project generation error:", err);
      setError(err.message || "Failed to create project");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Project Basics</CardTitle>
        <CardDescription>
          Enter basic information about your project
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 text-sm bg-red-100 border border-red-200 text-red-600 rounded-md">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label
            htmlFor="project-name"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Project Name
          </label>
          <input
            id="project-name"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="my-awesome-project"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="project-description"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Description
          </label>
          <textarea
            id="project-description"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="A short description of your project"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => router.push("/projects")}
        >
          Cancel
        </Button>
        <Button
          onClick={handleContinue}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Continue"}
        </Button>
      </CardFooter>
    </Card>
  );
} 