"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/auth-provider";
import { ProtectedRoute } from "@/components/auth/protected-route";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
 * Function to format date
 * @param dateString - Date string to format
 * @returns Formatted date string
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Projects page component
 * @returns Projects page component
 */
export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createSupabaseClient();

  useEffect(() => {
    async function fetchProjects() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch projects");
        console.error("Error fetching projects:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, [user, supabase]);

  const projectsToDisplay = projects.length > 0 ? projects : [];
  const hasNoProjects = projectsToDisplay.length === 0 && !isLoading;

  return (
    <ProtectedRoute>
      <div className="container py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">
              Manage your generated projects
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Link href="/projects/new">
              <Button>Create New Project</Button>
            </Link>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="mt-8 flex justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {hasNoProjects && (
              <div className="mt-6 p-4 border border-yellow-200 bg-yellow-50 text-yellow-700 rounded-md">
                No projects found. Create your first project to get started!
              </div>
            )}
            
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projectsToDisplay.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{project.name}</CardTitle>
                      <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {project.template_type?.toUpperCase() || 'PROJECT'}
                      </span>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {project.framework && (
                      <div>
                        <p className="text-sm font-medium">Framework:</p>
                        <p className="text-sm text-muted-foreground">{project.framework}</p>
                      </div>
                    )}
                    {project.packages && project.packages.length > 0 && (
                      <div>
                        <p className="text-sm font-medium">Packages:</p>
                        <p className="text-sm text-muted-foreground">{project.packages.join(", ")}</p>
                      </div>
                    )}
                    {project.template && (
                      <div>
                        <p className="text-sm font-medium">Template:</p>
                        <p className="text-sm text-muted-foreground">{project.template}</p>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Created on: {formatDate(project.created_at)}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${project.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                    <Button size="sm">
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
} 