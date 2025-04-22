"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/auth-provider";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  id: string;
  name: string;
  description: string;
  template_type: "web" | "api" | "cli" | "mobile";
  framework: string;
  packages: string[];
  template: string;
  created_at: string;
}

/**
 * Edit project settings page
 */
export default function EditProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const router = useRouter();
  const { user } = useAuth();
  
  const [project, setProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      if (!user) return;
      
      try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        if (!data) {
          throw new Error("Project not found");
        }
        
        setProject(data);
        setProjectName(data.name);
        setProjectDescription(data.description || "");
      } catch (err: any) {
        console.error("Error fetching project:", err);
        setError(err.message || "Failed to load project");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [projectId, user]);

  /**
   * Save project settings
   */
  const saveSettings = async () => {
    if (!project || !user) return;
    
    if (!projectName.trim()) {
      setError("Project name cannot be empty");
      return;
    }
    
    setIsSaving(true);
    setError(null);
    
    try {
      const supabase = createSupabaseClient();
      const { error } = await supabase
        .from('projects')
        .update({
          name: projectName,
          description: projectDescription || null
        })
        .eq('id', projectId)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      // Navigate back to project details
      router.push(`/projects/${projectId}`);
    } catch (err: any) {
      console.error("Error updating project:", err);
      setError(err.message || "Failed to update project");
      setIsSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container py-10">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/projects/${projectId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Project</h1>
            {project && (
              <p className="text-muted-foreground">
                {project.name}
              </p>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-md mb-4">
            {error}
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Project Settings</CardTitle>
              <CardDescription>Edit your project details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  placeholder="Project name"
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

              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  Note: You can only edit the name and description. Framework, template,
                  and other settings cannot be changed after project creation.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => router.push(`/projects/${projectId}`)}
              >
                Cancel
              </Button>
              <Button
                onClick={saveSettings}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </ProtectedRoute>
  );
} 